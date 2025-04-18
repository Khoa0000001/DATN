import 'module-alias/register';
import * as os from 'os';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { GlobalExceptionFilter } from '@/common/filters/global-exception.filter';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
import { TrimPipe } from '@/common/pipes/trim.pipe';
import { ValidationPipe as ValidationPipeCtm } from '@/common/pipes/validation.pipe';
import { ValidationPipe } from '@nestjs/common';
// import { LoggerMiddleware } from '@/common/middleware/logger.middleware';
import { ExecutionTimeMiddleware } from '@/common/middleware/execution-time.middleware';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'verbose'], // Chỉ hiển thị lỗi và cảnh báo
  });

  const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000'];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  const apiPrefix = `api/${process.env.API_VERSION || 'v1'}`;
  app.use(ExecutionTimeMiddleware);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new TrimPipe(),
    new ValidationPipeCtm(),
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix(apiPrefix);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const host = process.env.HOST || '0.0.0.0';
  const port = process.env.PORT || 5000;
  app.use(cookieParser());
  await app.listen(port, host);
  // Lấy địa chỉ IP của máy trong mạng LAN
  const networkInterfaces = os.networkInterfaces();
  const localIP =
    Object.values(networkInterfaces)
      .flat()
      .find((iface) => iface?.family === 'IPv4' && !iface.internal)?.address ||
    'localhost';
  console.log(`🚀 Server đang chạy tại:`);
  console.log(`   - Local:   http://localhost:${port}/api/v1`);
  console.log(`   - Network: http://${localIP}:${port}/api/v1`);
}
bootstrap();
