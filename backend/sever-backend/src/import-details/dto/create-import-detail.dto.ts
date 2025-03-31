import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsInt,
  IsBoolean,
} from 'class-validator';

export class CreateImportDetailDto {
  @IsNotEmpty({ message: 'importInvoiceId không được để trống' })
  @IsString({ message: 'importInvoiceId phải là 1 chuỗi' })
  importInvoiceId: string;
  @IsNotEmpty({ message: 'productId không được để trống' })
  @IsString({ message: 'productId phải là 1 chuỗi' })
  productId: string;
  @IsNotEmpty({ message: 'quantity không được để trống' })
  @IsInt({ message: 'quantity phải là 1 số nguyên' })
  quantity: number;
  @IsNotEmpty({ message: 'importPrice không được để trống' })
  @IsNumber({}, { message: 'importPrice phải là 1 số thực' })
  importPrice: number;
  @IsNotEmpty({ message: 'totalImportPrice không được để trống' })
  @IsNumber({}, { message: 'totalImportPrice phải là 1 số thực' })
  totalImportPrice: number;
  @IsString({ message: 'description phải là 1 chuỗi' })
  @IsOptional()
  description?: string;
  @IsBoolean({ message: 'isDeleted phải là boolean' })
  @IsOptional()
  isDeleted?: boolean;
}
