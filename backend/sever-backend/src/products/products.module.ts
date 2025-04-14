import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { ProductImagesModule } from '@/product-images/product-images.module';
import { UploadModule } from '@/upload/upload.module';

@Module({
  imports: [PrismaModule, ProductImagesModule, UploadModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
