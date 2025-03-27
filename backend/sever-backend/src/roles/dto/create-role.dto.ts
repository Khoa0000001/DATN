import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'nameRole không được để trống' })
  @IsString({ message: 'nameRole phải là 1chuỗi' })
  nameRole: string;
  @IsString({ message: 'description phải là 1chuỗi' })
  @IsOptional()
  description?: string;
  @IsBoolean({ message: 'isDeleted phải là boolean' })
  @IsOptional()
  isDeleted?: boolean;
}
