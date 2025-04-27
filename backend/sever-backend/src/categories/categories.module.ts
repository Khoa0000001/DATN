import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { AttributesModule } from '@/attributes/attributes.module';
import { UploadModule } from '@/upload/upload.module';
@Module({
  imports: [PrismaModule, AttributesModule, UploadModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
