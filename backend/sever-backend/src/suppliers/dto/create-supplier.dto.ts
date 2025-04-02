import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty({ message: 'Tên nhà cung cấp không được để trống' })
  @IsString({ message: 'Tên nhà cung cấp phải là 1 chuỗi' })
  nameSupplier: string;
  @IsNotEmpty({ message: 'Địa chỉ nhà cung cấp không được để trống' })
  @IsString({ message: 'Địa chỉ nhà cung cấp phải là 1 chuỗi' })
  address: string;
  @IsNotEmpty({ message: 'Số điện thoại nhà cung cấp không được để trống' })
  @IsString({ message: 'Số điện thoại nhà cung cấp phải là 1 chuỗi' })
  @IsPhoneNumber('VN', {
    message: 'phone nhà cung cấp phải đúng đạnh dạng phone VN',
  })
  phone: string;
  @IsNotEmpty({ message: 'Email nhà cung cấp không được để trống' })
  @IsString({ message: 'Email nhà cung cấp phải là 1 chuỗi' })
  @IsEmail(
    { require_tld: true },
    { message: 'Email nhà cung cấp phải đúng đạnh dạng email' },
  )
  email: string;
  @IsString({ message: 'Description thuế nhà cung cấp phải là 1 chuỗi' })
  @IsOptional()
  description?: string;
  @IsBoolean({ message: 'isDeleted phải là boolean' })
  @IsOptional()
  isDeleted?: boolean;
}
