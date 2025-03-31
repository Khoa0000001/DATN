import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty({ message: 'userId không được để trống' })
  @IsString({ message: 'userId phải là 1 chu��i' })
  userId: string;
  @IsNotEmpty({ message: 'productId không được để trống' })
  @IsString({ message: 'productId phải là 1 chu��i' })
  productId: string;
  @IsInt({ message: 'quantity phải là 1 số nguyên' })
  @IsOptional()
  quantity: number;
  @IsBoolean({ message: 'isDeleted phải là boolean' })
  @IsOptional()
  isDeleted: boolean;
}
