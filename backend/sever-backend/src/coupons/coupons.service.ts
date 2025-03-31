import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class CouponsService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createCouponDto: CreateCouponDto) {
    const coupon = await this._prisma.coupons.create({
      data: createCouponDto,
    });
    return formatResponse('coupon created successfully', coupon);
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {};
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const coupons = await this._prisma.coupons.findMany(queryOptions);
    const totalCoupons = await this._prisma.coupons.count();
    return formatResponse(`This action returns all coupons`, coupons, {
      page,
      limit,
      total: totalCoupons,
    });
  }

  async findOne(id: string) {
    const coupon = await this._prisma.coupons.findUnique({
      where: { id },
    });
    return formatResponse(`This action returns coupon #${id}`, coupon);
  }

  async update(id: string, updateCouponDto: UpdateCouponDto) {
    const coupon = await this._prisma.coupons.update({
      where: { id },
      data: updateCouponDto,
    });
    return formatResponse(`This action updates coupon #${id}`, coupon);
  }

  async remove(id: string) {
    const coupon = await this._prisma.coupons.delete({
      where: { id },
    });
    return formatResponse(`This action removes coupon #${id}`, coupon);
  }
}
