import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateAttributeValueDto {
  @IsNotEmpty({ message: 'productId không được để trống' })
  @IsString({ message: 'productId phải là 1 chuỗi' })
  productId: string;
  @IsNotEmpty({ message: 'attributeId không được để trống' })
  @IsString({ message: 'attributeId phải là 1 chuỗi' })
  attributeId: string;
  @IsNotEmpty({ message: 'attributeId không được để trống' })
  @IsString({ message: 'attributeId phải là 1 chuỗi' })
  attributeValue: string;
  @IsOptional()
  tagValue: string;
}
