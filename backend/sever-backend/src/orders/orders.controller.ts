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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly _ordersService: OrdersService) {}

  @Post()
  @CheckId('users', 'userId')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this._ordersService.create(createOrderDto);
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
    return this._ordersService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  @CheckId('orders', 'id')
  @CheckId('users', 'userId')
  findOne(@Param('id') id: string) {
    return this._ordersService.findOne(id);
  }

  @Patch(':id')
  @CheckId('orders', 'id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this._ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @CheckId('orders', 'id')
  remove(@Param('id') id: string) {
    return this._ordersService.remove(id);
  }
}
