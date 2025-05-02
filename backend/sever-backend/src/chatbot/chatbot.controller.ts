// src/chatbot/chatbot.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private _chatbotService: ChatbotService) {}

  @Get()
  async ask(@Query('q') question: string) {
    const answer = await this._chatbotService.ask(question);
    return { question, answer };
  }
}
