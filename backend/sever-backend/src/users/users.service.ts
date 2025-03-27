import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class UsersService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this._prisma.users.create({
      data: createUserDto,
    });
    return formatResponse('User created successfully', user);
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {
      where: { isDeleted: false },
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
    if (!user) throw new NotFoundException('User not found');
    return formatResponse(`This action returns user`, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this._prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
    return formatResponse(`This action updates user`, user);
  }

  async remove(id: string) {
    const user = await this._prisma.users.update({
      where: { id },
      data: { isDeleted: true },
    });
    return formatResponse(`This action removes user`, user);
  }
}
