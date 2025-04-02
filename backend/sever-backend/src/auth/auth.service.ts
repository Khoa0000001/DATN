import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from './jwt/jwt.service';
import { Users } from '@prisma/client';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { isValidPassword } from '@/utils/auths.util';
import { UsersService } from '@/users/users.service';
import { formatResponse } from '@/utils/response.util';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _jwtService: JwtService,
    private readonly _userService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<Users | null> {
    const user = await this._prisma.users.findUnique({
      where: { email },
    });
    if (!user) throw new UnauthorizedException('Email không chính xác !');

    if (user && isValidPassword(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Password không chính xác!');
    }

    const payload: JwtPayload = {
      email: user.email,
      nameUser: user.nameUser,
      phone: user.phone,
      address: user.address,
      profilePicture: user.profilePicture,
    };
    const accessToken = this._jwtService.generateAccessToken(payload);
    const refreshToken = this._jwtService.generateRefreshToken(payload);

    return formatResponse('Login successfully', {
      access_token: accessToken,
      refresh_token: refreshToken,
      email: user.email,
      nameUser: user.nameUser,
      phone: user.phone,
      address: user.address,
      profilePicture: user.profilePicture,
    });
  }
  async register(registerDto: RegisterDto) {
    const user = await this._userService.create(registerDto);
    return user
      ? formatResponse('Register successfully', {
          email: registerDto.email,
          nameUser: registerDto.nameUser,
        })
      : formatResponse('Register lost', {
          email: registerDto.email,
          nameUser: registerDto.nameUser,
        });
  }
  refreshToken(oldRefreshToken: string) {
    try {
      const payload = this._jwtService.verifyRefreshToken(oldRefreshToken);
      const newAccessToken = this._jwtService.generateAccessToken(payload);
      const newRefreshToken = this._jwtService.generateRefreshToken(payload);

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
