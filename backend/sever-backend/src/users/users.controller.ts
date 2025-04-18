import {
  Controller,
  Get,
  // Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';
import { Roles } from '@/common/Decorators/roles.decorator';
import { Permissions } from '@/common/Decorators/permissions.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';
import { PermissionsGuard } from '@/common/guards/permissions.guard';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this._usersService.create(createUserDto);
  // }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('admin')
  @Permissions('view_users')
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
    return this._usersService.findAll(pageNum, limitNum, newSearch);
  }

  @Get(':id')
  @CheckId('users', 'id')
  findOne(@Param('id') id: string) {
    return this._usersService.findOne(id);
  }

  @Patch(':id')
  @CheckId('users', 'id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this._usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @CheckId('users', 'id')
  remove(@Param('id') id: string) {
    return this._usersService.remove(id);
  }
}
