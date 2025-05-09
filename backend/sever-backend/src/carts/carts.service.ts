import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';
@Injectable()
export class CartsService {
  constructor(private readonly _prisma: PrismaService) {}
  async createMany(createCartDtos: CreateCartDto[]) {
    const createdCarts = await Promise.all(
      createCartDtos.map((dto) =>
        this._prisma.carts.create({
          data: dto,
          select: { id: true }, // chỉ lấy trường id
        }),
      ),
    );

    const ids = createdCarts.map((cart) => cart.id);

    return formatResponse('Carts created successfully', ids); // => mảng các id
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {
      where: {
        isDeleted: false,
      },
    };
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const carts = await this._prisma.carts.findMany(queryOptions);
    const totalCarts = await this._prisma.carts.count({
      where: {
        isDeleted: false,
      },
    });
    return formatResponse('This action returns all carts', carts, {
      page,
      limit,
      total: totalCarts,
    });
  }

  async findOne(id: string) {
    const cart = await this._prisma.carts.findUnique({
      where: {
        isDeleted: false,
        id,
      },
    });
    return formatResponse(`This action returns a cart`, cart);
  }

  async findCartsByUserId(userId: string, page?: number, limit?: number) {
    const queryOptions: any = {
      where: {
        isDeleted: false,
        userId,
      },
    };
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const carts = await this._prisma.carts.findMany(queryOptions);
    const totalCart = await this._prisma.carts.count({
      where: {
        isDeleted: false,
        userId,
      },
    });
    return formatResponse(`This action returns a cart by userId`, carts, {
      page,
      limit,
      total: totalCart,
    });
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const cart = await this._prisma.carts.update({
      where: { id },
      data: updateCartDto,
    });
    return formatResponse(`This action updates a cart`, cart);
  }

  async remove(id: string) {
    const cart = await this._prisma.carts.update({
      where: { isDeleted: false, id },
      data: { isDeleted: true },
    });
    return formatResponse(`This action removes a cart`, cart);
  }
}
