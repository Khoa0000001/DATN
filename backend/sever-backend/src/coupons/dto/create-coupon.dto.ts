import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { IsUnique } from '@/common/Decorators/is-unique.decorator';

export class CreateCouponDto {
  @IsNotEmpty({ message: 'code không được để trống' })
  @IsString({ message: 'code phải là 1 chuỗi' })
  @IsUnique('coupons', { message: 'code đã tồn tại trong hệ thống' })
  code: string;
  @IsNotEmpty({ message: 'nameCoupon không được để trống' })
  @IsNumber({}, { message: 'discount phải là 1 số' })
  discount: number;
  @IsNotEmpty({ message: 'expiryDate không được để trống' })
  @IsDate({ message: 'expiryDate phải là 1 ngày' })
  expiryDate: Date;
  @IsBoolean({ message: 'isActive không phải là true hoặc false' })
  @IsOptional()
  isActive: boolean;
}
