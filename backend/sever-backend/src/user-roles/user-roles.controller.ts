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
import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly _userRolesService: UserRolesService) {}

  @Post()
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this._userRolesService.create(createUserRoleDto);
  }

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this._userRolesService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @CheckId('userRoles', 'id')
  findOne(@Param('id') id: string) {
    return this._userRolesService.findOne(id);
  }

  @Patch(':id')
  @CheckId('userRoles', 'id')
  update(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this._userRolesService.update(id, updateUserRoleDto);
  }

  @Delete(':id')
  @CheckId('userRoles', 'id')
  remove(@Param('id') id: string) {
    return this._userRolesService.remove(id);
  }
}
