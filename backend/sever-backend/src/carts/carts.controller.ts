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
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('carts')
export class CartsController {
  constructor(private readonly _cartsService: CartsService) {}

  @Post()
  // @CheckId('users', 'userId')
  // @CheckId('products', 'productId')
  create(@Body() createCartDto: CreateCartDto[]) {
    return this._cartsService.createMany(createCartDto);
  }

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    if (page && limit) {
      if (isNaN(pageNum) || pageNum <= 0 || isNaN(limitNum) || limitNum <= 0) {
        throw new BadRequestException(
          'Page and limit must be positive numbers.',
        );
      }
    }
    return this._cartsService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  @CheckId('carts', 'id')
  findOne(@Param('id') id: string) {
    return this._cartsService.findOne(id);
  }

  @Get('users/:userId')
  @CheckId('users', 'userId')
  findCartByUserId(
    @Param('userId') userId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this._cartsService.findCartsByUserId(
      userId,
      Number(page),
      Number(limit),
    );
  }

  @Patch(':id')
  @CheckId('carts', 'id')
  @CheckId('users', 'userId')
  @CheckId('products', 'productId')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this._cartsService.update(id, updateCartDto);
  }

  @Delete(':id')
  @CheckId('carts', 'id')
  remove(@Param('id') id: string) {
    return this._cartsService.remove(id);
  }
}
