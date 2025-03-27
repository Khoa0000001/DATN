import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class OrdersService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto) {
    const order = await this._prisma.orders.create({
      data: createOrderDto,
    });
    return formatResponse('Order created successfully', order);
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {
      where: { isDeleted: false },
    };
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const orders = await this._prisma.orders.findMany(queryOptions);
    const totalOrders = await this._prisma.orders.count({
      where: { isDeleted: false },
    });
    return formatResponse(`This action returns all orders`, orders, {
      page,
      limit,
      total: totalOrders,
    });
  }

  async findOne(id: string) {
    const order = await this._prisma.orders.findUnique({
      where: { isDeleted: false, id },
    });
    return formatResponse(`This action returns a order`, order);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this._prisma.orders.update({
      where: { isDeleted: false, id },
      data: updateOrderDto,
    });
    return formatResponse(`This action updates order`, order);
  }

  async remove(id: string) {
    const order = await this._prisma.orders.update({
      where: { isDeleted: false, id },
      data: { isDeleted: true },
    });
    return formatResponse(`This action removes order`, order);
  }
}
