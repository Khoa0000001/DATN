import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
// import { CreateAttributeValueDto } from '@/attribute-values/dto/create-attribute-value.dto';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  @IsString({ message: 'Tên sản phẩm phải là 1 chuỗi' })
  nameProduct: string;
  @IsNotEmpty({ message: 'Giá sản phẩm không được để trống' })
  @Type(() => Number)
  @IsNumber({}, { message: 'price phải là 1 số' })
  price: number;
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
}
