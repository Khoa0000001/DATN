import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class UserRolesService {
  constructor(private readonly _prisma: PrismaService) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
    const userRoles = await this._prisma.userRoles.create({
      data: createUserRoleDto,
    });
    return formatResponse('UserRolers created successfully ', userRoles);
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {
      where: { isDeleted: false },
    };

    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const userRoles = await this._prisma.userRoles.findMany(queryOptions);
    const totalUserRoles = await this._prisma.userRoles.count({
      where: { isDeleted: false },
    });
    return formatResponse('This action returns all userRoles', userRoles, {
      page,
      limit,
      total: totalUserRoles,
    });
  }

  async findOne(id: string) {
    const userRoles = await this._prisma.userRoles.findUnique({
      where: { isDeleted: false, id },
    });
    return formatResponse('This action returns a userRole', userRoles);
  }

  async update(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    const userRoles = await this._prisma.userRoles.update({
      where: { isDeleted: false, id },
      data: updateUserRoleDto,
    });
    return formatResponse('This action updates a userRole', userRoles);
  }

  async remove(id: string) {
    const userRoles = await this._prisma.userRoles.update({
      where: { isDeleted: false, id },
      data: { isDeleted: true },
    });
    return formatResponse('This action removes a userRole', userRoles);
  }
}
