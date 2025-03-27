import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsDate,
  IsEnum,
} from 'class-validator';
import { ImportStatus } from '@prisma/client';

export class CreateImportInvoiceDto {
  @IsNotEmpty({ message: 'supplierId không được để trống' })
  @IsString({ message: 'supplierId phải là 1 chuỗi' })
  supplierId: string;
  @IsNotEmpty({ message: 'totalAmount không được để trống' })
  @IsNumber({}, { message: 'totalAmount phải là 1 số' })
  totalAmount: number;
  @IsNotEmpty({ message: 'importDate không được để trống' })
  @IsDate({ message: 'importDate phải là 1 ngày' })
  importDate: Date;
  @IsString({ message: 'description phải là 1 chuỗi' })
  @IsOptional()
  description: string;
  @IsEnum(ImportStatus, {
    message: 'status phải là PENDING,  COMPLETED, hoặc CANCELED',
  })
  status?: ImportStatus;
  @IsBoolean({ message: 'isDeleted phải là boolean' })
  @IsOptional()
  isDeleted: boolean;
}
