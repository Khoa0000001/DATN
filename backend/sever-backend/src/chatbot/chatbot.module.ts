import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { GeminiModule } from '@/gemini/gemini.module'; // ✅ import đúng module
import { PrismaModule } from '@/prisma/prisma.module';
import { EmbeddingModule } from '@/embedding/embedding.module';

@Module({
  imports: [GeminiModule, PrismaModule, EmbeddingModule], // ✅ thay vì inject trực tiếp GeminiService
  controllers: [ChatbotController],
  providers: [ChatbotService],
})
export class ChatbotModule {}
