import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ImportInvoicesService } from './import-invoices.service';
import { CreateImportInvoiceDto } from './dto/create-import-invoice.dto';
import { UpdateImportInvoiceDto } from './dto/update-import-invoice.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('import-invoices')
export class ImportInvoicesController {
  constructor(private readonly _importInvoicesService: ImportInvoicesService) {}

  @Post()
  create(@Body() createImportInvoiceDto: CreateImportInvoiceDto) {
    return this._importInvoicesService.create(createImportInvoiceDto);
  }

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    if (page && limit) {
      if (isNaN(pageNum) || pageNum <= 0 || isNaN(limitNum) || limitNum <= 0) {
        throw new BadRequestException(
          'Page and limit must be positive numbers.',
        );
      }
    }
    return this._importInvoicesService.findAll(pageNum, limitNum);
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
