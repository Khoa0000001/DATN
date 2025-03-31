import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserRoleDto {
  @IsNotEmpty({ message: 'userId không được để trống' })
  @IsString({ message: 'userId phải là 1 chuỗi' })
  userId: string;
  @IsNotEmpty({ message: 'roleId không được để trống' })
  @IsString({ message: 'roleId phải là 1 chuỗi' })
  roleId: string;
  @IsBoolean({ message: 'isDeleted phải là boolean' })
  @IsOptional()
  isDeleted?: boolean;
}
