import { Injectable } from '@nestjs/common';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class RolePermissionsService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createRolePermissionDto: CreateRolePermissionDto) {
    const rolePermission = await this._prisma.rolePermissions.create({
      data: createRolePermissionDto,
    });
    return formatResponse(
      'reolePermission created successfully',
      rolePermission,
    );
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {};
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const rolePermissions =
      await this._prisma.rolePermissions.findMany(queryOptions);
    const totalRolePermissions = await this._prisma.rolePermissions.count();
    return formatResponse(
      `This action returns all rolePermissions`,
      rolePermissions,
      {
        page,
        limit,
        total: totalRolePermissions,
      },
    );
  }

  async findOne(id: string) {
    const rolePermission = await this._prisma.rolePermissions.findUnique({
      where: { id },
    });
    return formatResponse(`This action returns rolePermission`, rolePermission);
  }

  async update(id: string, updateRolePermissionDto: UpdateRolePermissionDto) {
    const rolePermission = await this._prisma.rolePermissions.update({
      where: { id },
      data: updateRolePermissionDto,
    });
    return formatResponse(`This action updates rolePermission`, rolePermission);
  }

  async remove(id: string) {
    const rolePermission = await this._prisma.rolePermissions.delete({
      where: { id },
    });
    return formatResponse(
      `This action removes a rolePermission`,
      rolePermission,
    );
  }
}
