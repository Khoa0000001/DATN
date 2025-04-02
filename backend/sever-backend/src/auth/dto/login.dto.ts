import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class LoginDto {
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail(
    { require_tld: true },
    { message: 'Email nhà cung cấp phải đúng đạnh dạng email' },
  )
  email: string;

  @IsNotEmpty({ message: 'password không được để trống' })
  @IsString({ message: 'password phải là 1 chuỗi' })
  password: string;
}
