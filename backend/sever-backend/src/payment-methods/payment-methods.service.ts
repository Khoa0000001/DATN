import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class PaymentMethodsService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createPaymentMethodDto: CreatePaymentMethodDto) {
    const paymentMethod = await this._prisma.paymentMethods.create({
      data: createPaymentMethodDto,
    });
    return formatResponse('PaymentMethod created successfully', paymentMethod);
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {};
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const paymentMethods =
      await this._prisma.paymentMethods.findMany(queryOptions);
    const totalPaymentMethods = await this._prisma.paymentMethods.count();
    return formatResponse(
      `This action returns all paymentMethods`,
      paymentMethods,
      { page, limit, total: totalPaymentMethods },
    );
  }

  async findOne(id: string) {
    const paymentMethod = await this._prisma.paymentMethods.findUnique({
      where: { id },
    });
    return formatResponse('This action returns a paymentMethod', paymentMethod);
  }

  async update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    const paymentMethod = await this._prisma.paymentMethods.update({
      where: { id },
      data: updatePaymentMethodDto,
    });
    return formatResponse('PaymentMethod updated successfully', paymentMethod);
  }

  async remove(id: string) {
    const paymentMethod = await this._prisma.paymentMethods.delete({
      where: { id },
    });
    return formatResponse('PaymentMethod removed successfully', paymentMethod);
  }
}
