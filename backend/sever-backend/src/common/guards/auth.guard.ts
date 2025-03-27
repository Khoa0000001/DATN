import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization;

    if (!token || token !== 'Bearer my-secret-token') {
      return false; // Chặn request nếu không có token hợp lệ
    }
    return true;
  }
}
