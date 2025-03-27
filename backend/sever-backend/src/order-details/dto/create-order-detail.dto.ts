import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsInt,
} from 'class-validator';

export class CreateOrderDetailDto {
  @IsNotEmpty({ message: 'orderId không được để trống' })
  @IsString({ message: 'orderId phải là 1 chu��i' })
  orderId: string;
  @IsNotEmpty({ message: 'productId không được để trống' })
  @IsString({ message: 'productId phải là 1 chu��i' })
  productId: string;
  @IsNotEmpty({ message: 'quantity không được để trống' })
  @IsInt({ message: 'quantity phải là 1 số nguyên' })
  quantity: number;
  @IsNotEmpty({ message: 'price không được để trống' })
  @IsNumber({}, { message: 'price phải là 1 số' })
  price: number;
  @IsNotEmpty({ message: 'totalPrice không được để trống' })
  @IsNumber({}, { message: 'totalPrice phải là 1 số' })
  @IsInt({ message: 'totalPrice phải là 1 số nguyên' })
  totalPrice: number;
  @IsBoolean({ message: 'isDeleted không phải là 1 boolean' })
  @IsOptional()
  isDeleted?: boolean;
}
