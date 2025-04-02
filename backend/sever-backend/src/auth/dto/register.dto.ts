import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { IsUnique } from '@/common/Decorators/is-unique.decorator';
export class RegisterDto {
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
}
