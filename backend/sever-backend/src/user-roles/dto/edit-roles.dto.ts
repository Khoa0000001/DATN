import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class EditRolesDto {
  @IsNotEmpty({ message: 'User ID không được để trống' })
  @IsString({ message: 'User ID phải là một chuỗi' })
  userId: string;

  @IsArray({ message: 'Role ID phải là một mảng' })
  @ArrayNotEmpty({ message: 'Mảng Role ID không được để trống' })
  @IsString({ each: true, message: 'Mỗi Role ID phải là một chuỗi' })
  roleIds: string[];
}
