import { Module } from '@nestjs/common';
import { AttributeValuesService } from './attribute-values.service';
import { AttributeValuesController } from './attribute-values.controller';
import { PrismaModule } from '@/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [AttributeValuesController],
  providers: [AttributeValuesService],
  exports: [AttributeValuesService],
})
export class AttributeValuesModule {}
