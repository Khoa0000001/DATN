import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsEnum,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { ImportStatus } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateImportInvoiceDto {
  @IsNotEmpty({ message: 'supplierId không được để trống' })
  @IsString({ message: 'supplierId phải là 1 chuỗi' })
  supplierId: string;
  @IsNotEmpty({ message: 'totalAmount không được để trống' })
  @IsNumber({}, { message: 'totalAmount phải là 1 số' })
  totalAmount: number;
  @IsNotEmpty({ message: 'importDate không được để trống' })
  @IsDateString({}, { message: 'importDate phải là 1 ngày' })
  importDate: string;
  @IsString({ message: 'description phải là 1 chuỗi' })
  @IsOptional()
  description?: string;
  @IsEnum(ImportStatus, {
    message: 'status phải là PENDING,  COMPLETED, hoặc CANCELED',
  })
  @IsOptional()
  status?: ImportStatus;
  @IsBoolean({ message: 'isDeleted phải là boolean' })
  @IsOptional()
  isDeleted?: boolean;
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}

class ProductDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  importPrice: number;

  @IsNotEmpty()
  @IsNumber()
  totalImportPrice: number;
}
