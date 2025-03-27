import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Kết nối database thành công!');
    } catch (error) {
      console.error('❌ Kết nối database thất bại:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🔌 Đã ngắt kết nối database.');
  }
}
