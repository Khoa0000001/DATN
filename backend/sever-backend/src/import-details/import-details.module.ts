import { Module } from '@nestjs/common';
import { ImportDetailsService } from './import-details.service';
import { ImportDetailsController } from './import-details.controller';
import { PrismaModule } from '@/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [ImportDetailsController],
  providers: [ImportDetailsService],
})
export class ImportDetailsModule {}
