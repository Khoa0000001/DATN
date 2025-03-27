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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this._usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this._usersService.findAll(Number(page), Number(limit));
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
