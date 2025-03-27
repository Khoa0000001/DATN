import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  @IsString({ message: 'Tên sản phẩm phải là 1 chu��i' })
  nameProduct: string;
  @IsNotEmpty({ message: 'Giá sản phẩm không được để trống' })
  @IsNumber({}, { message: 'price phải là 1 số' })
  price: number;
  @IsNotEmpty({ message: 'Giá sản phẩm không được để trống' })
  @IsString({ message: 'Mô tả sản phẩm phải là 1 chu��i' })
  @IsOptional()
  descriptionProduct: string;
  @IsNotEmpty({ message: 'Giá sản phẩm không được để trống' })
  @IsBoolean({ message: 'isDeleted phải là boolean' })
  @IsOptional()
  isDeleted: boolean;
  @IsNotEmpty({ message: 'Giá sản phẩm không được để trống' })
  categoryId: string;
}
