// src/chatbot/chatbot.service.ts
import { Injectable } from '@nestjs/common';
import { GeminiService } from 'src/gemini/gemini.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { EmbeddingService } from '@/embedding/embedding.service';
import cosineSimilarity from '@/utils/cosineSimilarity';

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
  
  👉 Hãy phản hồi như một nhân viên tư vấn bán hàng chuyên nghiệp, gợi ý sản phẩm phù hợp hoặc trả lời câu hỏi, giữ phong cách thân thiện, tự nhiên.
    `;

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
}
