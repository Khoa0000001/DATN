import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const ctx = context.switchToHttp(); // Lấy context HTTP
    const response = ctx.getResponse(); // Lấy đối tượng Response
    return next.handle().pipe(
      tap(() => console.log(`⏱️ Execution time: ${Date.now() - now}ms`)), // Đo thời gian
      map((data) => ({
        success: true,
        statusCode: response.statusCode,
        ...data,
        timestamp: new Date().toISOString(),
        path: ctx.getRequest().url,
        executionTime: `${Date.now() - now}ms`,
      })),
    );
  }
}
