import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { IsUnique } from '@/common/Decorators/is-unique.decorator';
export class CreatePermissionDto {
  @IsNotEmpty({ message: 'permissionName không được để trống' })
  @IsString({ message: 'permissionName phải là 1 chuỗi' })
  @IsUnique('permissions', {
    message: 'permissionName đã tồn tại trong hệ thống',
  })
  permissionName: string;
  @IsString({ message: 'description phải là 1 chuỗi' })
  @IsOptional()
  description?: string;
}
