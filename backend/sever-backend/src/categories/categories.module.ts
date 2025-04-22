import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { AttributesModule } from '@/attributes/attributes.module';
@Module({
  imports: [PrismaModule, AttributesModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
