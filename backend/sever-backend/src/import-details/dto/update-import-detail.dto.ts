import { PartialType } from '@nestjs/mapped-types';
import { CreateImportDetailDto } from './create-import-detail.dto';

export class UpdateImportDetailDto extends PartialType(CreateImportDetailDto) {}
