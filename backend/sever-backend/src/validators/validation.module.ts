import { Module } from '@nestjs/common';
import { IsUniqueConstraint } from '@/validators/is-unique.validator';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [IsUniqueConstraint],
  exports: [IsUniqueConstraint],
})
export class ValidationModule {}
