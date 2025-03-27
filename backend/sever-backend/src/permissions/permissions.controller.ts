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
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this._permissionsService.findAll(Number(page), Number(limit));
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

  @Delete(':id')
  @CheckId('permissions', 'id')
  remove(@Param('id') id: string) {
    return this._permissionsService.remove(id);
  }
}
