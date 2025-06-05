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

  @Get('build-pc')
  async buildPC(
    @Query('budget') budget: string,
    @Query('purpose') purpose: string,
    @Query('categoryIds') categoryIds: string,
  ) {
    const budgetNumber = parseFloat(budget);
    if (isNaN(budgetNumber)) {
      return { error: 'Invalid budget format' };
    }

    const categoryIdArray = categoryIds.split(',').map((id) => id.trim());

    const result = await this._chatbotService.buildPC(
      budgetNumber,
      purpose,
      categoryIdArray,
    );

    return result;
  }
}
