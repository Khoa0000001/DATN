import {
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'productId không được để trống' })
  @IsString({ message: 'productId phải là 1 chuỗi' })
  productId: string;
  @IsNotEmpty({ message: 'userId không được để trống' })
  @IsString({ message: 'userId phải là 1 chuỗi' })
  userId: string;
  @IsNotEmpty({ message: 'rating không được để trống' })
  @IsNumber({}, { message: 'rating phải là 1 số' })
  rating: number;
  @IsNotEmpty({ message: 'comment không được để trống' })
  @IsString({ message: 'comment phải là 1 chuỗi' })
  comment: string;
  @IsBoolean({ message: 'isDeleted phải là boolean' })
  @IsOptional()
  isDeleted?: boolean;
}
