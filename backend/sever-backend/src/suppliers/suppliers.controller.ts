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
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly _suppliersService: SuppliersService) {}

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this._suppliersService.create(createSupplierDto);
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const newSearch =
      search && search.trim().length > 0 ? search.trim() : undefined;
    if (page && limit) {
      if (isNaN(pageNum) || pageNum <= 0 || isNaN(limitNum) || limitNum <= 0) {
        throw new BadRequestException(
          'Page and limit must be positive numbers.',
        );
      }
    }
    return this._suppliersService.findAll(pageNum, limitNum, newSearch);
  }

  @Get(':id')
  @CheckId('suppliers', 'id')
  findOne(@Param('id') id: string) {
    return this._suppliersService.findOne(id);
  }

  @Patch(':id')
  @CheckId('suppliers', 'id')
  update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this._suppliersService.update(id, updateSupplierDto);
  }

  @Delete()
  removeMany(@Body() dto: { ids: string[] }) {
    return this._suppliersService.removeMany(dto.ids);
  }
}
