import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty({ message: 'productId không được để trống' })
  @IsString({ message: 'productId phải là 1 chuỗi' })
  productId: string;
  @IsNotEmpty({ message: 'userId không được để trống' })
  @IsString({ message: 'userId phải là 1 chuỗi' })
  userId: string;
}
