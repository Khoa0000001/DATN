import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    // Kiểm tra nếu errorResponse là object, nếu không thì dùng default message
    const errors =
      typeof errorResponse === 'object' && 'errors' in errorResponse
        ? (errorResponse as any).errors
        : 'Something went wrong';

    // Tính executionTime
    const startTime = request['startTime'] as number;
    const executionTime = startTime ? `${Date.now() - startTime}ms` : 'N/A';
    console.log(`⏱️ Execution time: ${executionTime}`);

    response.status(status).json({
      success: false,
      statusCode: status,
      message: exception.message,
      errors: errors,
      path: request.url,
      timestamp: new Date().toISOString(),
      executionTime,
      api_version: process.env.API_VERSION,
    });
  }
}
