import { Module } from '@nestjs/common';
import { ImportInvoicesService } from './import-invoices.service';
import { ImportInvoicesController } from './import-invoices.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ImportInvoicesController],
  providers: [ImportInvoicesService],
})
export class ImportInvoicesModule {}
