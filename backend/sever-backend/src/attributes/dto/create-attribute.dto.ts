import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateAttributeDto {
  @IsNotEmpty({ message: 'nameAttribute không được để trống' })
  @IsString({ message: 'nameAttribute phải là 1 chuỗi' })
  nameAttribute: string;
  @IsString({ message: 'nameAttribute phải là 1 chuỗi' })
  @IsOptional()
  description?: string;
  @IsNotEmpty({ message: 'categoryId không được để trống' })
  @IsString({ message: 'categoryId phải là 1 chuỗi' })
  categoryId: string;
}
