import { Injectable, BadRequestException } from '@nestjs/common';
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

  async findAll(page?: number, limit?: number, search?: string) {
    const where: any = {
      isDeleted: false,
    };

    if (search) {
      where.OR = [
        { nameCustomer: { contains: search } },
        { phoneCustomer: { contains: search } },
        { address: { contains: search } },
        { shippingMethod: { contains: search } },
        {
          user: {
            OR: [
              { email: { contains: search } },
              { nameUser: { contains: search } },
            ],
          },
        },
      ];
    }

    const queryOptions: any = {
      where,
      select: {
        id: true,
        createDate: true,
        updateDate: true,
        nameCustomer: true,
        phoneCustomer: true,
        address: true,
        timeOfReceipt: true,
        paymentMethod: true,
        shippingMethod: true,
        totalAmount: true,
        status: true,
        user: {
          select: {
            nameUser: true,
            email: true,
          },
        },
      },
    };

    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }

    const orders = await this._prisma.orders.findMany(queryOptions);

    const totalOrders = await this._prisma.orders.count({
      where,
    });

    function flattenOrders(orders: any[]) {
      return orders.map((order) => ({
        id: order.id,
        createDate: order.createDate,
        updateDate: order.updateDate,
        nameCustomer: order.nameCustomer,
        phoneCustomer: order.phoneCustomer,
        address: order.address,
        timeOfReceipt: order.timeOfReceipt,
        paymentMethod: order.paymentMethod,
        shippingMethod: order.shippingMethod,
        totalAmount: order.totalAmount,
        status: order.status,
        nameUser: order.user?.nameUser || null,
        email: order.user?.email || null,
      }));
    }

    return formatResponse(
      `This action returns all orders`,
      flattenOrders(orders),
      {
        page,
        limit,
        total: totalOrders,
      },
    );
  }

  async findOne(id: string) {
    const order = await this._prisma.orders.findUnique({
      where: {
        isDeleted: false,
        id: id,
      },
      select: {
        id: true,
        createDate: true,
        updateDate: true,
        nameCustomer: true,
        phoneCustomer: true,
        address: true,
        timeOfReceipt: true,
        paymentMethod: true,
        shippingMethod: true,
        totalAmount: true,
        status: true,
        user: {
          select: {
            nameUser: true,
            email: true,
          },
        },
      },
    });

    if (!order) {
      throw new BadRequestException(
        'Một số ID order xóa không tồn tại trong hệ thống',
      );
    }
    const newOrder = {
      id: order.id,
      createDate: order.createDate,
      updateDate: order.updateDate,
      nameCustomer: order.nameCustomer,
      phoneCustomer: order.phoneCustomer,
      address: order.address,
      timeOfReceipt: order.timeOfReceipt,
      paymentMethod: order.paymentMethod,
      shippingMethod: order.shippingMethod,
      totalAmount: order.totalAmount,
      status: order.status,
      nameUser: order.user?.nameUser || null,
      email: order.user?.email || null,
    };
    return formatResponse(`This action returns a order`, newOrder);
  }

  formatOrders(rawOrders: any[]) {
    return rawOrders.map((order) => ({
      id: order.id,
      date: new Date(order.createDate).toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      paymentMethod: order.paymentMethod,
      total: order.totalAmount,
      recipientName: order.nameCustomer,
      phone: order.phoneCustomer,
      address: order.address,
      deliveryTime: order.timeOfReceipt,
      products: order.orderDetails.map((detail: any) => ({
        name: detail.product?.nameProduct,
        price: detail.price,
        quantity: detail.quantity,
        image:
          detail.product?.productImages?.[0]?.imageUrl ??
          'https://via.placeholder.com/60',
      })),
    }));
  }

  async findOrderByUserId(userId: string) {
    const listOrder = await this._prisma.orders.findMany({
      where: {
        isDeleted: false,
        userId: userId,
      },
      include: {
        orderDetails: {
          include: {
            product: {
              select: {
                id: true,
                nameProduct: true,
                price: true,
                productImages: {
                  select: {
                    imageUrl: true,
                  },
                  take: 1, // chỉ lấy ảnh đầu tiên
                },
              },
            },
          },
        },
      },
      orderBy: {
        createDate: 'desc',
      },
    });

    return formatResponse(
      'Get list Order by userId',
      this.formatOrders(listOrder),
    );
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
