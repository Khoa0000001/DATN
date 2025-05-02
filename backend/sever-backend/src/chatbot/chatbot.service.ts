// src/chatbot/chatbot.service.ts
import { Injectable } from '@nestjs/common';
import { GeminiService } from 'src/gemini/gemini.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmbeddingService } from '@/embedding/embedding.service';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _geminiService: GeminiService,
    private readonly _embeddingService: EmbeddingService,
  ) {}

  async ask(question: string): Promise<string> {
    const vecterQuestion = await this._embeddingService.getEmbedding(question);

    const prompt = `
  Bạn là trợ lý AI có kiến thức từ hệ thống nội bộ.

  Thông tin nội bộ:
  ${JSON.stringify(vecterQuestion)}

  Câu hỏi của người dùng:
  "${question}"

  Hãy trả lời một cách chính xác và đầy đủ dựa trên nội dung trên.
      `;

    return this._geminiService.generate(prompt);
  }
}
