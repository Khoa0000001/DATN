import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class PermissionsService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createPermissionDto: CreatePermissionDto) {
    const permission = await this._prisma.permissions.create({
      data: createPermissionDto,
    });
    return formatResponse('Permission created successfully', permission);
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {};
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const permissions = await this._prisma.permissions.findMany(queryOptions);
    const totalPermissions = await this._prisma.permissions.count();
    return formatResponse(`This action returns all permissions`, permissions, {
      page,
      limit,
      total: totalPermissions,
    });
  }

  async findOne(id: string) {
    const permission = await this._prisma.permissions.findUnique({
      where: { id },
    });
    if (!permission) throw new NotFoundException('Permission not found');
    return formatResponse(`This action returns permission`, permission);
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this._prisma.permissions.update({
      where: { id },
      data: updatePermissionDto,
    });
    return formatResponse(`This action updates permission`, permission);
  }

  async remove(id: string) {
    const permission = await this._prisma.permissions.delete({
      where: { id },
    });
    return formatResponse(`This action removes a permission`, permission);
  }
}
