import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { IsUnique } from '@/common/Decorators/is-unique.decorator';
export class CreateUserDto {
  @IsNotEmpty({ message: 'nameUser không được để trống' })
  @IsString({ message: 'nameUser phải là 1 chuỗi' })
  nameUser: string;

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail(
    { require_tld: true },
    { message: 'Email nhà cung cấp phải đúng đạnh dạng email' },
  )
  @IsUnique('users', {
    message: 'Email đã tồn tại trong hệ thống',
  })
  email: string;

  @IsNotEmpty({ message: 'password không được để trống' })
  @IsString({ message: 'password phải là 1 chuỗi' })
  password: string;

  @IsString({ message: 'phone không được để trống' })
  @IsPhoneNumber('VN', {
    message: 'phone nhà cung cấp phải đúng đạnh dạng phone VN',
  })
  @IsOptional()
  phone?: string;

  @IsString({ message: 'address phải là 1 chuỗi' })
  @IsOptional()
  address?: string;

  @IsString({ message: 'profilePicture phải là 1 chuỗi' })
  @IsOptional()
  profilePicture?: string;

  @IsBoolean({ message: 'isDeleted phải là boolean' })
  @IsOptional()
  isDeleted?: boolean;
  @IsBoolean({ message: 'isVerified phải là boolean' })
  @IsOptional()
  isVerified?: boolean;
  @IsString({ message: 'verificationCode phải là 1 chuỗi' })
  @IsOptional()
  verificationCode?: string;
}
