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
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly _permissionsService: PermissionsService) {}

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this._permissionsService.create(createPermissionDto);
  }

  @Get()
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
    return this._permissionsService.findAll(pageNum, limitNum, newSearch);
  }

  @Get(':id')
  @CheckId('permissions', 'id')
  findOne(@Param('id') id: string) {
    return this._permissionsService.findOne(id);
  }

  @Patch(':id')
  @CheckId('permissions', 'id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this._permissionsService.update(id, updatePermissionDto);
  }

  @Delete()
  // @CheckId('permissions', 'id')
  removeMany(@Body('ids') ids: string[]) {
    return this._permissionsService.removeMany(ids);
  }
}
