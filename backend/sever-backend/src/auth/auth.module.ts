import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from './jwt/jwt.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '@/users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Đọc các biến môi trường từ .env
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRES'),
        },
      }),
    }),
  ],
  providers: [AuthService, JwtService, PrismaService, UsersService],
  controllers: [AuthController],
  exports: [JwtService], // Để sử dụng ở nơi khác nếu cần
})
export class AuthModule {}
