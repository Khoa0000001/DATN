// import { PartialType } from '@nestjs/mapped-types';
// import { CreateProductDto } from './create-product.dto';

// export class UpdateProductDto extends PartialType(CreateProductDto) {
//   keepProductImages: string;
// }

import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto {
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  @IsString({ message: 'Tên sản phẩm phải là 1 chuỗi' })
  nameProduct: string;
  @IsNotEmpty({ message: 'Giá sản phẩm không được để trống' })
  @Type(() => Number)
  @IsNumber({}, { message: 'price phải là 1 số' })
  @IsOptional()
  price: number;
  @IsOptional()
  quantity?: number;
  @IsString({ message: 'Mô tả sản phẩm phải là 1 chuỗi' })
  @IsOptional()
  description?: string;
  @IsNotEmpty({ message: 'categoryId không được để trống' })
  @IsString({ message: 'categoryId phải là 1 chuỗi' })
  categoryId: string;
  @IsBoolean({ message: 'isDeleted phải là boolean' })
  @IsOptional()
  isDeleted?: boolean;
  @IsOptional()
  attributeValues?: string;
  @IsOptional()
  keepProductImages?: string;
}
