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
import { ImportDetailsService } from './import-details.service';
import { CreateImportDetailDto } from './dto/create-import-detail.dto';
import { UpdateImportDetailDto } from './dto/update-import-detail.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('import-details')
export class ImportDetailsController {
  constructor(private readonly _importDetailsService: ImportDetailsService) {}

  @Post()
  @CheckId('importInvoices', 'importInvoiceId')
  @CheckId('products', 'productId')
  create(@Body() createImportDetailDto: CreateImportDetailDto) {
    return this._importDetailsService.create(createImportDetailDto);
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
    return this._importDetailsService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  @CheckId('importDetails', 'id')
  findOne(@Param('id') id: string) {
    return this._importDetailsService.findOne(id);
  }

  @Patch(':id')
  @CheckId('importDetails', 'id')
  @CheckId('importInvoices', 'importInvoiceId')
  @CheckId('products', 'productId')
  update(
    @Param('id') id: string,
    @Body() updateImportDetailDto: UpdateImportDetailDto,
  ) {
    return this._importDetailsService.update(id, updateImportDetailDto);
  }

  @Delete(':id')
  @CheckId('importDetails', 'id')
  remove(@Param('id') id: string) {
    return this._importDetailsService.remove(id);
  }
}
