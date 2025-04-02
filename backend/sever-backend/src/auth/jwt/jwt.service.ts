import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;

  constructor(
    private readonly _jwtService: NestJwtService,
    private readonly _configService: ConfigService,
  ) {
    this.accessSecret =
      this._configService.get<string>('JWT_ACCESS_SECRET') ?? '';
    this.refreshSecret =
      this._configService.get<string>('JWT_REFRESH_SECRET') ?? '';
  }

  generateAccessToken(payload: JwtPayload): string {
    return this._jwtService.sign(payload, {
      secret: this.accessSecret,
      expiresIn: this._configService.get<string>('JWT_ACCESS_EXPIRES'),
    });
  }

  verifyAccessToken(token: string): JwtPayload {
    return this._jwtService.verify(token, {
      secret: this.accessSecret,
    });
  }

  generateRefreshToken(payload: JwtPayload): string {
    return this._jwtService.sign(payload, {
      secret: this.refreshSecret,
      expiresIn: this._configService.get<string>('JWT_REFRESH_EXPIRES'),
    });
  }

  verifyRefreshToken(token: string): JwtPayload {
    return this._jwtService.verify(token, {
      secret: this.refreshSecret,
    });
  }
}
