// src/upload/upload.module.ts
import { Module } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  imports: [ConfigModule], // để đọc .env nếu cần
  providers: [ImageUploadService, CloudinaryProvider],
  exports: [ImageUploadService], // để các module khác có thể dùng
})
export class UploadModule {}
