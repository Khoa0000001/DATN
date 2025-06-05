// src/chatbot/chatbot.service.ts
import { Injectable } from '@nestjs/common';
import { GeminiService } from 'src/gemini/gemini.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { EmbeddingService } from '@/embedding/embedding.service';
import cosineSimilarity from '@/utils/cosineSimilarity';
import { formatResponse } from '@/utils/response.util';
import { encode } from 'gpt-tokenizer';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _geminiService: GeminiService,
    private readonly _embeddingService: EmbeddingService,
  ) {}

  async getTop8SimilarProducts(questionEmbedding: number[]) {
    const products = await this._prisma.products.findMany({
      where: {
        embedding: { not: Prisma.JsonNullValueFilter.JsonNull },
        isDeleted: false,
        quantity: { gt: 0 },
      },
      select: {
        id: true,
        nameProduct: true,
        description: true,
        price: true,
        category: {
          select: { nameCategory: true },
        },
        embedding: true,
      },
    });

    const scored = products
      .map((product) => ({
        ...product,
        score: cosineSimilarity(
          questionEmbedding,
          product.embedding as number[],
        ),
      }))
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
      .slice(0, 8);

    return scored;
  }

  async ask(question: string, userId?: string): Promise<string> {
    const vectorQuestion = await this._embeddingService.getEmbedding(question);
    const similarProducts = await this.getTop8SimilarProducts(vectorQuestion);
    let recentHistory: {
      id: string;
      createDate: Date;
      updateDate: Date;
      question: string;
      answer: string;
      userId: string | null;
    }[] = [];
    // Lấy lịch sử trò chuyện gần đây (giới hạn 5 tin cuối)
    if (userId)
      recentHistory = await this._prisma.chatHistory.findMany({
        where: {
          userId: userId,
        },
        orderBy: { createDate: 'desc' },
        take: 10,
      });

    const historyContext = recentHistory
      .reverse() // đảo ngược để hiển thị từ cũ đến mới
      .map((item) => `Người dùng: ${item.question}\nAI: ${item.answer}`)
      .join('\n\n');

    const internalInfo = similarProducts
      .map((p, i) => {
        return `Sản phẩm ${i + 1}:
  - Tên: ${p.nameProduct}
  - Mô tả: ${p.description || 'Không có mô tả'}
  - Giá: ${p.price} VND
  - Loại: ${p.category?.nameCategory || 'Không xác định'}
  - Link: ${process.env.FRONTEND_URL}/products/${p.id}`;
      })
      .join('\n\n');

    const prompt = `
Bạn là trợ lý AI bán hàng thân thiện. Dưới đây là lịch sử cuộc trò chuyện và thông tin sản phẩm liên quan:

Lịch sử trò chuyện gần đây:
${historyContext || 'Chưa có lịch sử trò chuyện.'}

Sản phẩm liên quan:
${internalInfo}

Người dùng vừa hỏi:
"${question}"

👉 Yêu cầu phản hồi:
- Trả lời ngắn gọn, rõ ràng, đúng trọng tâm.
- Nếu giới thiệu sản phẩm, chỉ nêu 1–2 sản phẩm phù hợp nhất.
- Khi đề cập đến đường link sản phẩm, hãy dùng thẻ HTML: <a style="color:blue" target="_blank"rel="noopener noreferrer" href="URL">Tên sản phẩm</a>.
- Phong cách: tư vấn viên chuyên nghiệp, thân thiện, không dài dòng.
`;
    const tokens = encode(prompt);

    console.log('🧠 Prompt token count:', tokens.length);
    const answer = await this._geminiService.generate(prompt);

    // Lưu lịch sử trò chuyện
    await this._prisma.chatHistory.create({
      data: {
        question,
        answer,
        userId: userId || null,
      },
    });

    return answer;
  }

  private generatePrompt(
    budget: number,
    usagePurpose: string,
    products: any[],
  ): string {
    return `
Tôi muốn bạn đóng vai trò là chuyên gia tư vấn xây dựng máy tính cá nhân (PC builder).
Tôi có ngân sách tối đa là ${budget} VNĐ.
Mục đích sử dụng của tôi là: "${usagePurpose}".

Dưới đây là danh sách các sản phẩm có thể chọn, được chia theo từng loại (categoryId):

${JSON.stringify(products, null, 2)}

Yêu cầu:
- Chọn **mỗi loại categoryId chỉ 1 sản phẩm phù hợp nhất** với mục đích sử dụng.
- Tổng giá không vượt quá ${budget} VNĐ.
- Nếu có thể, tối ưu theo hiệu năng tốt nhất trong phạm vi giá.
- Trả về kết quả dạng JSON với các trường: productId, price,nameProduct, productImages,categoryId.
- Không cần giải thích thêm.
  `;
  }

  async buildPC(budget: number, usagePurpose: string, categoryIds: string[]) {
    // 1. Lấy toàn bộ sản phẩm có embedding trong các category yêu cầu
    const allProducts = await this._prisma.products.findMany({
      where: {
        categoryId: { in: categoryIds },
        isDeleted: false,
        embedding: { not: Prisma.JsonNullValueFilter.JsonNull },
      },
      select: {
        id: true,
        nameProduct: true,
        price: true,
        embedding: true,
        categoryId: true,
        productImages: {
          select: {
            imageUrl: true,
          },
          orderBy: {
            createDate: 'asc',
          },
        },
      },
    });

    const foundCategoryIds = Array.from(
      new Set(allProducts.map((p) => p.categoryId)),
    );

    const missingCategoryIds = categoryIds.filter(
      (id) => !foundCategoryIds.includes(id),
    );

    if (!allProducts.length) {
      return {
        error: 'Không tìm thấy sản phẩm nào trong các danh mục yêu cầu.',
      };
    }

    // 2. Lấy embedding cho usagePurpose để tính điểm
    const questionEmbedding =
      await this._embeddingService.getEmbedding(usagePurpose);

    const scoredProducts = allProducts.map((product) => ({
      ...product,
      score: cosineSimilarity(questionEmbedding, product.embedding as number[]),
    }));

    const topProductsPerCategory = foundCategoryIds.flatMap((categoryId) =>
      scoredProducts
        .filter((p) => p.categoryId === categoryId)
        .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
        .slice(0, 3)
        // eslint-disable-next-line no-unused-vars
        .map(({ embedding, score, productImages, ...resu }) => ({
          ...resu,
          productImages: [productImages[0]],
        })),
    );

    const prompt = this.generatePrompt(
      budget,
      usagePurpose,
      topProductsPerCategory,
    );

    const tokens = encode(prompt);

    console.log('🧠 Prompt token count:', tokens.length);
    const result = await this._geminiService.generate(prompt);

    function cleanJsonString(raw: string): string {
      // Loại bỏ các dấu ```json hoặc ``` ở đầu và cuối chuỗi
      return raw
        .trim()
        .replace(/^```json/, '') // bỏ ```json ở đầu (nếu có)
        .replace(/^```/, '') // bỏ ``` ở đầu (nếu không có json)
        .replace(/```$/, '') // bỏ ``` ở cuối
        .trim();
    }
    const cleaned = cleanJsonString(result);
    const parsedResult = JSON.parse(cleaned);

    return formatResponse('Đây là tư vấn của ai', {
      answer: parsedResult,
      warning:
        missingCategoryIds.length > 0
          ? `Không tìm thấy sản phẩm trong các danh mục: ${missingCategoryIds.join(', ')}`
          : null,
    });
  }
}
