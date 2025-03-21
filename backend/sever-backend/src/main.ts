import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { GlobalExceptionFilter } from '@/common/filters/global-exception.filter';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
import { TrimPipe } from '@/common/pipes/trim.pipe';
import { ValidationPipe } from '@/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new TrimPipe(), new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
