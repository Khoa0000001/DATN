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
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly _couponsService: CouponsService) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this._couponsService.create(createCouponDto);
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
    return this._couponsService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  @CheckId('coupons', 'id')
  findOne(@Param('id') id: string) {
    return this._couponsService.findOne(id);
  }

  @Patch(':id')
  @CheckId('coupons', 'id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this._couponsService.update(id, updateCouponDto);
  }

  @Delete(':id')
  @CheckId('coupons', 'id')
  remove(@Param('id') id: string) {
    return this._couponsService.remove(id);
  }
}
