// 📁 mail/mail.module.ts
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [MailService],
  exports: [MailService], // 👈 Xuất ra để module khác dùng
})
export class MailModule {}
