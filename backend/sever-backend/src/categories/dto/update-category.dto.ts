import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class Attributes {
  @IsOptional()
  id: string | undefined;
  @IsNotEmpty({ message: 'nameAttribute không được để trống' })
  @IsString({ message: 'nameAttribute phải là 1 chuỗi' })
  nameAttribute: string;

  @IsString({ message: 'description phải là 1 chuỗi' })
  @IsOptional()
  description?: string;
}

export class UpdateCategoryDto {
  @IsNotEmpty({ message: 'Tên danh mục không được để trống' })
  @IsString({ message: 'Tên danh mục phải là 1 chuỗi' })
  nameCategory: string;

  @IsString({ message: 'Mô tả phải là 1 chuỗi' })
  @IsOptional()
  description?: string;

  @ValidateNested({ each: true })
  @Type(() => Attributes)
  attributes: Attributes[];
  @IsOptional()
  deletedAttributeIds?: string[];
}
