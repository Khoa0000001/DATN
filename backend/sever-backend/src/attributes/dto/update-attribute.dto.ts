import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateAttributeDto {
  @IsNotEmpty({ message: 'id không được để trống' })
  id: string;
  @IsNotEmpty({ message: 'nameAttribute không được để trống' })
  @IsString({ message: 'nameAttribute phải là 1 chuỗi' })
  nameAttribute: string;
  @IsString({ message: 'nameAttribute phải là 1 chuỗi' })
  @IsOptional()
  description?: string;
}
