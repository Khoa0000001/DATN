import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from './jwt/jwt.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { isValidPassword } from '@/utils/auths.util';
import { UsersService } from '@/users/users.service';
import { MailService } from '@/mail/mail.service';
import { formatResponse } from '@/utils/response.util';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import * as ms from 'ms';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _userService: UsersService,
    private readonly _mailService: MailService, // Giả sử bạn có một service gửi mail
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    await this._userService.checkIsVerified(email);
    const user = (await this._userService.getValidPayLoadToken(email)).data;

    if (!isValidPassword(password, user.password)) {
      throw new UnauthorizedException('Mật khẩu không chính xác!');
    }

    // ✅ Lọc role đã bị xoá (nếu có)
    const validRoles = user.userRoles.filter((ur) => !ur.role.isDeleted);

    const permissions = validRoles.flatMap((ur) =>
      ur.role.rolePermissions.map((rp) => rp.permission.permissionName),
    );

    const roles = validRoles.map((ur) => ur.role.codeRole);

    return {
      ...user,
      permissions,
      roles,
    };
  }

  async login(loginDto: LoginDto, res: Response): Promise<any> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const payload: JwtPayload = {
      email: user.email,
      nameUser: user.nameUser,
      phone: user.phone,
      address: user.address,
      profilePicture: user.profilePicture,
      roles: user.roles,
      permissions: user.permissions,
    };
    const accessToken = this._jwtService.generateAccessToken(payload);
    const refreshToken = this._jwtService.generateRefreshToken(payload);

    const expiresRefeshStr = process.env.JWT_REFRESH_EXPIRES;
    const expiresRefresh = ms(expiresRefeshStr);
    // Lưu refresh token vào cookie với HTTP-only để tăng bảo mật
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, // Không thể truy cập bằng JavaScript (bảo mật hơn)
      secure: false,
      sameSite: 'lax',
      maxAge: expiresRefresh,
      path: '/',
    });

    return formatResponse('Login successfully', {
      access_token: accessToken,
      user_info: {
        userId: user.id,
        email: user.email,
        nameUser: user.nameUser,
        phone: user.phone,
        address: user.address,
        profilePicture: user.profilePicture,
      },
      roles: user.roles,
      permissions: user.permissions,
    });
  }
  async register(registerDto: RegisterDto) {
    const code = randomBytes(3).toString('hex');
    const user = await this._userService.create({
      ...registerDto,
      verificationCode: code,
    });
    await this._mailService.sendVerificationLink(user.data.email, code);
    return user
      ? formatResponse('Vui lòng kiểm tra email để xác thực tài khoản', {
          email: registerDto.email,
          nameUser: registerDto.nameUser,
        })
      : formatResponse('Register lost', {
          email: registerDto.email,
          nameUser: registerDto.nameUser,
        });
  }

  async verifyEmail(email: string, code: string, res: Response) {
    const user = (await this._userService.findByEmail(email)).data;
    let redirectUrl = '';
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

    if (!user || user.verificationCode !== code) {
      redirectUrl = `${frontendUrl}/login?verified=false`;
      res.redirect(redirectUrl);
      return formatResponse('Xác thực thất bại', { success: false });
    }

    await this._userService.update(user?.id, {
      isVerified: true,
      verificationCode: '',
    });

    redirectUrl = `${frontendUrl}/login?verified=true`;
    res.redirect(redirectUrl);
    return formatResponse('Tài khoản đã được xác thực', { success: true });
  }

  refreshToken(req: Request) {
    try {
      const oldRefreshToken = req.cookies['refreshToken'];
      const payload = this._jwtService.verifyRefreshToken(oldRefreshToken);
      delete payload.exp;
      delete payload.iat;
      const newAccessToken = this._jwtService.generateAccessToken(payload);

      return formatResponse('RefreshToken successfully', {
        accessToken: newAccessToken,
      });
    } catch (error) {
      Logger.error('Error refreshing token:', error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
