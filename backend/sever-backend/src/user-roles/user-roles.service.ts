import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { EditRolesDto } from './dto/edit-roles.dto';
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

  async editRoles(editRolesDto: EditRolesDto) {
    // Kiểm tra các roleId có tồn tại trong bảng roles hay không
    const roles = await this._prisma.roles.findMany({
      where: {
        id: {
          in: editRolesDto.roleIds, // Lọc theo danh sách các roleId
        },
      },
    });

    if (roles.length !== editRolesDto.roleIds.length) {
      throw new BadRequestException('Một hoặc nhiều roleId không tồn tại');
    }
    // Xóa tất cả userRoles hiện tại của userId để đảm bảo chỉ có 1 userRole duy nhất
    await this._prisma.userRoles.deleteMany({
      where: { userId: editRolesDto.userId },
    });

    // Tạo mảng các đối tượng cho phép tạo nhiều bản ghi userRoles
    const userRolesData = editRolesDto.roleIds.map((roleId) => ({
      userId: editRolesDto.userId,
      roleId,
    }));

    // Tạo mới userRoles với các roleId đã chọn
    const userRoles = await this._prisma.userRoles.createMany({
      data: userRolesData,
    });

    return formatResponse('UserRoles updated successfully', userRoles);
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
