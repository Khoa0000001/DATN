import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty({ message: 'Tên danh mục không được để trống' })
  @IsString({ message: 'Tên danh mục phải là 1 chuỗi' })
  nameCategory: string;

  @IsString({ message: 'Mô tả phải là 1 chuỗi' })
  @IsOptional()
  description?: string;
  @IsOptional()
  attributes?: string;
  @IsOptional()
  deletedAttributeIds?: string;
}
