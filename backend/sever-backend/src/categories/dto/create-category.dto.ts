import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Tên danh mục không được để trống' })
  @IsString({ message: 'Tên danh mục phải là 1 chuỗi' })
  nameCategory: string;

  @IsString({ message: 'Mô tả phải là 1 chuỗi' })
  @IsOptional()
  description?: string;

  @IsBoolean({ message: 'isDeleted phải là boolean' })
  @IsOptional()
  isDeleted?: boolean;
  @IsOptional()
  attributes?: string;
}
