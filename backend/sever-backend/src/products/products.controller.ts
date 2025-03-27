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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';
@Controller('products')
export class ProductsController {
  constructor(private readonly _productsService: ProductsService) {}

  @Post()
  @CheckId('categories', 'categoryId')
  create(@Body() createProductDto: CreateProductDto) {
    return this._productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this._productsService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @CheckId('products', 'id')
  findOne(@Param('id') id: string) {
    return this._productsService.findOne(id);
  }

  @Patch(':id')
  @CheckId('products', 'id')
  @CheckId('products', 'categoryId')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this._productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @CheckId('products', 'id')
  remove(@Param('id') id: string) {
    return this._productsService.remove(id);
  }
}
