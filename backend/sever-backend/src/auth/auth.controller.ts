import { Controller, Post, Get, Body, Query, Res, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _configService: ConfigService,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this._authService.login(loginDto, res);
  }
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this._authService.register(registerDto);
  }
  @Post('refresh-token')
  refresh(@Req() req: Request) {
    return this._authService.refreshToken(req);
  }
  @Get('verify')
  async verifyEmail(
    @Query('email') email: string,
    @Query('code') code: string,
    @Res() res: Response,
  ) {
    return await this._authService.verifyEmail(email, code, res);
  }
}
