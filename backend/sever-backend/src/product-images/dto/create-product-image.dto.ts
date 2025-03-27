import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductImageDto {
  @IsNotEmpty({ message: 'productId không được để trống' })
  @IsString({ message: 'productId phải là 1 chuỗi' })
  productId: string;
  @IsNotEmpty({ message: 'imagePath không được để trống' })
  @IsString({ message: 'imagePath phải là 1 chuỗi' })
  imageUrl: string;
}
