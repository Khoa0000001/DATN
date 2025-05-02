import { Injectable } from '@nestjs/common';
import { CreateChatHistoryDto } from './dto/create-chat-history.dto';
import { UpdateChatHistoryDto } from './dto/update-chat-history.dto';

@Injectable()
export class ChatHistoryService {
  create(createChatHistoryDto: CreateChatHistoryDto) {
    return 'This action adds a new chatHistory';
  }

  findAll() {
    return `This action returns all chatHistory`;
  }

  findOne(id: string) {
    return `This action returns a #${id} chatHistory`;
  }

  update(id: string, updateChatHistoryDto: UpdateChatHistoryDto) {
    return `This action updates a #${id} chatHistory`;
  }

  remove(id: string) {
    return `This action removes a #${id} chatHistory`;
  }
}
