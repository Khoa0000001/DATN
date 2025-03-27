import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class OrderDetailsService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createOrderDetailDto: CreateOrderDetailDto) {
    const orderDetail = await this._prisma.orderDetails.create({
      data: createOrderDetailDto,
    });
    return formatResponse('OrderDetail created successfully', orderDetail);
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {};
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const orderDetails = await this._prisma.orderDetails.findMany(queryOptions);
    const totalOrderDetails = await this._prisma.orderDetails.count();
    return formatResponse(
      `This action returns all orderDetails`,
      orderDetails,
      {
        page,
        limit,
        total: totalOrderDetails,
      },
    );
  }

  async findOne(id: string) {
    const orderDetail = await this._prisma.orderDetails.findUnique({
      where: { id },
    });
    return formatResponse(
      `This action returns orderDetail #${id}`,
      orderDetail,
    );
  }

  async update(id: string, updateOrderDetailDto: UpdateOrderDetailDto) {
    const orderDetail = await this._prisma.orderDetails.update({
      where: { id },
      data: updateOrderDetailDto,
    });
    return formatResponse(
      `This action updates orderDetail #${id}`,
      orderDetail,
    );
  }

  async remove(id: string) {
    const orderDetail = await this._prisma.orderDetails.delete({
      where: { id },
    });
    return formatResponse(`This action removes a orderDetail`, orderDetail);
  }
}
