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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly _rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this._rolesService.create(createRoleDto);
  }

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this._rolesService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @CheckId('roles', 'id')
  findOne(@Param('id') id: string) {
    return this._rolesService.findOne(id);
  }

  @Patch(':id')
  @CheckId('roles', 'id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this._rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @CheckId('roles', 'id')
  remove(@Param('id') id: string) {
    return this._rolesService.remove(id);
  }
}
