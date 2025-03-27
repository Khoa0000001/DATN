import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRolePermissionDto {
  @IsNotEmpty({ message: 'roleId không được để trống' })
  @IsString({ message: 'roleId phải là 1 chuỗi' })
  roleId: string;
  @IsNotEmpty({ message: 'permissionId không được để trống' })
  @IsString({ message: 'permissionId phải là 1 chuỗi' })
  permissionId: string;
}
