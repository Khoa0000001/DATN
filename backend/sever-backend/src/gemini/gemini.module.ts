import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [GeminiService],
  exports: [GeminiService], // 👈 Xuất ra để module khác dùng
})
export class GeminiModule {}
