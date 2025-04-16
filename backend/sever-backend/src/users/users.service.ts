import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { formatResponse } from '@/utils/response.util';
import { hashPassword } from '@/utils/auths.util';

@Injectable()
export class UsersService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const newCreateUserDto: CreateUserDto = {
      ...createUserDto,
      password: hashPassword(createUserDto.password),
    };
    const user = await this._prisma.users.create({
      data: newCreateUserDto,
    });
    return formatResponse(
      'User created successfully with isVerified is false',
      user,
    );
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {
      where: { isDeleted: false },
      select: {
        id: true,
        email: true,
        nameUser: true,
        phone: true,
        address: true,
        profilePicture: true,
        userRoles: {
          select: {
            id: true,
            createDate: true,
            updateDate: true,
            userId: true,
            roleId: true,
          },
        },
        Orders: true,
        Wishlists: true,
        Carts: true,
        createDate: true,
        updateDate: true,
      },
    };

    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }

    const users = await this._prisma.users.findMany(queryOptions);
    const totalUsers = await this._prisma.users.count({
      where: { isDeleted: false },
    });

    return formatResponse(`This action returns all users`, users, {
      page,
      limit,
      total: totalUsers,
    });
  }

  async findOne(id: string) {
    const user = await this._prisma.users.findUnique({
      where: { isDeleted: false, id },
    });
    return formatResponse(`This action returns user`, user);
  }

  async findByEmail(email: string) {
    const user = await this._prisma.users.findUnique({
      where: { isDeleted: false, email },
    });
    if (!user) throw new NotFoundException('User not found');
    return formatResponse(`This action returns user`, user);
  }

  async getValidPayLoadToken(email: string) {
    const user = await this._prisma.users.findFirst({
      where: { email, isDeleted: false },
      include: {
        userRoles: {
          where: { isDeleted: false },
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!user) {
      throw new UnauthorizedException(
        'Email không chính xác hoặc tài khoản đã bị khóa!',
      );
    }
    return formatResponse(`This action getValidPayLoadToken user`, user);
  }

  async checkIsVerified(email: string) {
    const user = await this._prisma.users.findUnique({
      where: { email, isDeleted: false },
    });

    if (!user?.isVerified) {
      throw new ForbiddenException('Email chưa được xác thực!');
    }
    return formatResponse(`This action checkIsVerified user`, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this._prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
    return formatResponse(`This action updates user`, user);
  }

  async remove(id: string) {
    const [hasRelatedOrders] = await Promise.all([
      this._prisma.orders.count({
        where: { userId: id },
      }),
    ]);
    if (hasRelatedOrders > 0) {
      const user = await this._prisma.users.update({
        where: { id },
        data: { isDeleted: true },
      });
      return formatResponse(`This action removes user`, user);
    } else {
      const user = await this._prisma.users.delete({
        where: { id },
      });
      return formatResponse(`This action removes user`, user);
    }
  }
}
