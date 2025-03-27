import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('role-permissions')
export class RolePermissionsController {
  constructor(
    private readonly _rolePermissionsService: RolePermissionsService,
  ) {}

  @Post()
  @CheckId('Roles', 'roleId')
  @CheckId('Permissions', 'permissionId')
  create(@Body() createRolePermissionDto: CreateRolePermissionDto) {
    return this._rolePermissionsService.create(createRolePermissionDto);
  }

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this._rolePermissionsService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @CheckId('rolePermissions', 'id')
  findOne(@Param('id') id: string) {
    return this._rolePermissionsService.findOne(id);
  }

  @Patch(':id')
  @CheckId('rolePermissions', 'id')
  @CheckId('Roles', 'roleId')
  @CheckId('Permissions', 'permissionId')
  update(
    @Param('id') id: string,
    @Body() updateRolePermissionDto: UpdateRolePermissionDto,
  ) {
    return this._rolePermissionsService.update(id, updateRolePermissionDto);
  }

  @Delete(':id')
  @CheckId('rolePermissions', 'id')
  remove(@Param('id') id: string) {
    return this._rolePermissionsService.remove(id);
  }
}
