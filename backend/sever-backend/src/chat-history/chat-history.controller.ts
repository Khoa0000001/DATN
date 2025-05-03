import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ChatHistoryService } from './chat-history.service';

@Controller('chat-history')
export class ChatHistoryController {
  constructor(private readonly _chatHistoryService: ChatHistoryService) {}

  @Get(':id')
  findByUserId(
    @Param('id') id: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const pageNum = Number(page);
    const limitNum = Number(limit);

    if (page && limit) {
      if (isNaN(pageNum) || pageNum <= 0 || isNaN(limitNum) || limitNum <= 0) {
        throw new BadRequestException(
          'Page and limit must be positive numbers.',
        );
      }
    }
    return this._chatHistoryService.findByUserId(id, pageNum, limitNum);
  }
}
