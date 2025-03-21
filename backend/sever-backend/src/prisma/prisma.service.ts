import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      datasources: {
        db: {
          url: `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_HOST}/${process.env.DB_NAME}`,
        },
      },
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✅ Kết nối database thành công!');
    } catch (error) {
      this.logger.error('❌ Kết nối database thất bại:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('🔌 Đã ngắt kết nối database.');
  }
}
