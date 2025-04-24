import { PartialType } from '@nestjs/mapped-types';
import { CreateAttributeValueDto } from './create-attribute-value.dto';

export class UpdateAttributeValueDto extends PartialType(
  CreateAttributeValueDto,
) {}

export class UpdateAttributeValueByIdDto {
  id: string;
  attributeValue: string;
  productId: string;
  attributeId: string;
}
