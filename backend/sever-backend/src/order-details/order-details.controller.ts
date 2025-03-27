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
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly _orderDetailsService: OrderDetailsService) {}

  @Post()
  @CheckId('orders', 'orderId')
  @CheckId('products', 'productId')
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this._orderDetailsService.create(createOrderDetailDto);
  }

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this._orderDetailsService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @CheckId('orderDetails', 'id')
  findOne(@Param('id') id: string) {
    return this._orderDetailsService.findOne(id);
  }

  @Patch(':id')
  @CheckId('orderDetails', 'id')
  @CheckId('orders', 'orderId')
  @CheckId('products', 'productId')
  update(
    @Param('id') id: string,
    @Body() updateOrderDetailDto: UpdateOrderDetailDto,
  ) {
    return this._orderDetailsService.update(id, updateOrderDetailDto);
  }

  @Delete(':id')
  @CheckId('orderDetails', 'id')
  remove(@Param('id') id: string) {
    return this._orderDetailsService.remove(id);
  }
}
