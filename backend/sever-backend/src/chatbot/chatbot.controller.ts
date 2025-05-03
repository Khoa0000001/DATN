import { Controller, Get, Query } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private _chatbotService: ChatbotService) {}

  @Get()
  async ask(
    @Query('q') question: string,
    @Query('userId') userId?: string, // nhận thêm userId từ query
  ) {
    const answer = await this._chatbotService.ask(question, userId); // truyền userId vào
    return { question, answer };
  }
}
