import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmbeddingService } from './embedding.service';

@Module({
  imports: [ConfigModule], // để đọc .env nếu cần
  providers: [EmbeddingService],
  exports: [EmbeddingService], // để các module khác có thể dùng
})
export class EmbeddingModule {}
