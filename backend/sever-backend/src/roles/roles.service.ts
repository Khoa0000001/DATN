import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class RolesService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createRoleDto: CreateRoleDto) {
    const role = await this._prisma.roles.create({ data: createRoleDto });
    return formatResponse('This action adds a new role', role);
  }

  async findAll(page?: number, limit?: number, search?: string) {
    const where: any = {
      isDeleted: false,
    };

    if (search) {
      where.OR = [
        { nameRole: { contains: search } },
        { codeRole: { contains: search } },
      ];
    }

    const queryOptions: any = {
      where,
    };

    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }

    const [roles, totalRoles] = await Promise.all([
      this._prisma.roles.findMany(queryOptions),
      this._prisma.roles.count({ where }),
    ]);

    return formatResponse(`This action returns all roles`, roles, {
      page,
      limit,
      total: totalRoles,
    });
  }

  async findOne(id: string) {
    const role = await this._prisma.roles.findUnique({
      where: {
        isDeleted: false,
        id,
      },
    });
    if (!role) throw new NotFoundException('Role not found');
    return formatResponse(`This action returns a role`, role);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this._prisma.roles.update({
      where: {
        isDeleted: false,
        id,
      },
      data: updateRoleDto,
    });
    if (!role) throw new NotFoundException('Role not found');
    return formatResponse(`This action updates a role`, role);
  }

  async removeMany(ids: string[]) {
    const [roles] = await Promise.all([
      this._prisma.roles.updateMany({
        where: {
          id: { in: ids },
          isDeleted: false,
        },
        data: { isDeleted: true },
      }),
      this._prisma.userRoles.updateMany({
        where: {
          roleId: { in: ids },
        },
        data: { isDeleted: true },
      }),
    ]);

    return formatResponse('Xóa nhiều vai trò thành công', roles);
  }
}
