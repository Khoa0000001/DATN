import { Injectable } from '@nestjs/common';
import { CreateShippingMethodDto } from './dto/create-shipping-method.dto';
import { UpdateShippingMethodDto } from './dto/update-shipping-method.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class ShippingMethodsService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createShippingMethodDto: CreateShippingMethodDto) {
    const shippingMethod = await this._prisma.shippingMethods.create({
      data: createShippingMethodDto,
    });
    return formatResponse(
      'ShippingMethod created successfully',
      shippingMethod,
    );
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {};
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const shippingMethods =
      await this._prisma.shippingMethods.findMany(queryOptions);
    const totalSuppliers = this._prisma.shippingMethods.count();
    return formatResponse(
      'ShippingMethods retrieved successfully',
      shippingMethods,
      { page, limit, total: totalSuppliers },
    );
  }

  async findOne(id: string) {
    const shippingMethod = await this._prisma.shippingMethods.findUnique({
      where: { id },
    });
    return formatResponse(
      `This action returns a #${id} shippingMethod`,
      shippingMethod,
    );
  }

  async update(id: string, updateShippingMethodDto: UpdateShippingMethodDto) {
    const shippingMethod = await this._prisma.shippingMethods.update({
      where: { id },
      data: updateShippingMethodDto,
    });
    return formatResponse(
      `This action updates a #${id} shippingMethod`,
      shippingMethod,
    );
  }

  async remove(id: string) {
    const shippingMethod = await this._prisma.shippingMethods.delete({
      where: { id },
    });
    return formatResponse(
      `This action removes a #${id} shippingMethod`,
      shippingMethod,
    );
  }
}
