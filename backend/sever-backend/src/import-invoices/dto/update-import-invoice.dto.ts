import { PartialType } from '@nestjs/mapped-types';
import { CreateImportInvoiceDto } from './create-import-invoice.dto';

export class UpdateImportInvoiceDto extends PartialType(
  CreateImportInvoiceDto,
) {}
