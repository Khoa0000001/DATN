import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { PermissionsGuard } from '@/common/guards/permissions.guard';
import { Roles } from '@/common/Decorators/roles.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly _rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this._rolesService.create(createRoleDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('admin')
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const newSearch =
      search && search.trim().length > 0 ? search.trim() : undefined;
    if (page && limit) {
      if (isNaN(pageNum) || pageNum <= 0 || isNaN(limitNum) || limitNum <= 0) {
        throw new BadRequestException(
          'Page and limit must be positive numbers.',
        );
      }
    }
    return this._rolesService.findAll(pageNum, limitNum, newSearch);
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
