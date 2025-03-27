import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ImportInvoicesService } from './import-invoices.service';
import { CreateImportInvoiceDto } from './dto/create-import-invoice.dto';
import { UpdateImportInvoiceDto } from './dto/update-import-invoice.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('import-invoices')
export class ImportInvoicesController {
  constructor(private readonly _importInvoicesService: ImportInvoicesService) {}

  @Post()
  @CheckId('suppliers', 'supplierId')
  create(@Body() createImportInvoiceDto: CreateImportInvoiceDto) {
    return this._importInvoicesService.create(createImportInvoiceDto);
  }

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this._importInvoicesService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @CheckId('importInvoices', 'id')
  findOne(@Param('id') id: string) {
    return this._importInvoicesService.findOne(id);
  }

  @Patch(':id')
  @CheckId('importInvoices', 'id')
  @CheckId('suppliers', 'supplierId')
  update(
    @Param('id') id: string,
    @Body() updateImportInvoiceDto: UpdateImportInvoiceDto,
  ) {
    return this._importInvoicesService.update(id, updateImportInvoiceDto);
  }

  @Delete(':id')
  @CheckId('importInvoices', 'id')
  remove(@Param('id') id: string) {
    return this._importInvoicesService.remove(id);
  }
}
