import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class ChatHistoryService {
  constructor(private readonly _prismaService: PrismaService) {}

  async findByUserId(id: string, page?: number, limit?: number) {
    const where: any = {
      userId: id,
    };

    const queryOptions: any = {
      where,
      orderBy: {
        createDate: 'asc', // Sắp xếp theo ngày tạo từ sớm nhất đến muộn nhất
      },
    };

    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }

    const [history, totalhistory] = await Promise.all([
      this._prismaService.chatHistory.findMany(queryOptions),
      this._prismaService.chatHistory.count({ where }),
    ]);

    return formatResponse('This action returns all roles', history, {
      page,
      limit,
      total: totalhistory,
    });
  }
}
