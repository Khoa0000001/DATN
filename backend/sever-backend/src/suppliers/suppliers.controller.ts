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
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this._suppliersService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @CheckId('supplies', 'id')
  findOne(@Param('id') id: string) {
    return this._suppliersService.findOne(id);
  }

  @Patch(':id')
  @CheckId('supplies', 'id')
  update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this._suppliersService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  @CheckId('supplies', 'id')
  remove(@Param('id') id: string) {
    return this._suppliersService.remove(id);
  }
}
