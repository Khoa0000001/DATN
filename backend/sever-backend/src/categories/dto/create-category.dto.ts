import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';

class Attributes {
  @IsNotEmpty({ message: 'nameAttribute không được để trống' })
  @IsString({ message: 'nameAttribute phải là 1 chuỗi' })
  nameAttribute: string;

  @IsString({ message: 'description phải là 1 chuỗi' })
  @IsOptional()
  description?: string;
}

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

  @ValidateNested({ each: true }) // <-- validate từng phần tử
  @Type(() => Attributes) // <-- dùng class-transformer để biết type con
  attributes: Attributes[];
}
