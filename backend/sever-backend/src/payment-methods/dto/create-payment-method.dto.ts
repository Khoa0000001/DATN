import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
import { IsUnique } from '@/common/Decorators/is-unique.decorator';

export class CreatePaymentMethodDto {
  @IsNotEmpty({ message: 'name không được để trống' })
  @IsString({ message: 'name phải là 1 chuỗi' })
  @IsUnique('paymentMethods', {
    message: 'name đã tồn tại trong hệ thống',
  })
  name: string;
  @IsString({ message: 'description phải là 1 chuỗi' })
  @IsOptional()
  description?: string;
  @IsBoolean({ message: 'isActive không phải là true hoặc false' })
  @IsOptional()
  isActive?: boolean;
}
