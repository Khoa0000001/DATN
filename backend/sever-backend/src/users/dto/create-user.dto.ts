import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { IsUnique } from '@/common/Decorators/is-unique.decorator';
export class CreateUserDto {
  @IsNotEmpty({ message: 'nameUser không được để trống' })
  @IsString({ message: 'nameUser phải là 1 chuỗi' })
  nameUser: string;

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsUnique('users', {
    message: 'Email đã tồn tại trong hệ thống',
  })
  email: string;

  @IsNotEmpty({ message: 'password không được để trống' })
  @IsString({ message: 'password phải là 1 chuỗi' })
  password: string;

  @IsString({ message: 'phone không được để trống' })
  @IsOptional()
  phone?: string;

  @IsString({ message: 'address không được để trống' })
  @IsOptional()
  address?: string;

  @IsString({ message: 'profilePicture không được để trống' })
  @IsOptional()
  profilePicture?: string;

  @IsBoolean({ message: 'isDeleted phải là boolean' })
  @IsOptional()
  isDeleted?: boolean;
}
