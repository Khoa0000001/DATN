import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'userId không được để trống' })
  @IsString({ message: 'userId phải là 1 chuỗi' })
  userId: string;
  @IsNotEmpty({ message: 'shippingInfo không được để trống' })
  @IsString({ message: 'shippingInfo phải là 1 chuỗi' })
  shippingInfo: string;
  @IsNotEmpty({ message: 'paymentMethod không được để trống' })
  @IsString({ message: 'paymentMethod phải là 1 chuỗi' })
  paymentMethod: string;
  @IsNotEmpty({ message: 'shippingMethod không được để trống' })
  @IsString({ message: 'shippingMethod phải là 1 chuỗi' })
  shippingMethod: string;
  @IsNotEmpty({ message: 'totalAmount không được để trống ' })
  @IsNumber({}, { message: 'totalAmount phải là 1 số' })
  totalAmount: number;
  @IsEnum(OrderStatus, {
    message:
      'status phải là PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELED hoặc cancelled',
  })
  status?: OrderStatus;
  @IsBoolean({ message: 'isDeleted phải là boolean' })
  @IsOptional()
  isDeleted?: boolean;
}
