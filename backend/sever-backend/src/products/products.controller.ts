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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
@Controller('products')
export class ProductsController {
  constructor(private readonly _productsService: ProductsService) {}

  @Post()
  // @CheckId('categories', 'categoryId')
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this._productsService.create(createProductDto, files);
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
    return this._productsService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  @CheckId('products', 'id')
  findOne(@Param('id') id: string) {
    return this._productsService.findOne(id);
  }

  @Get('/category/:categoryId')
  @CheckId('categories', 'categoryId')
  findByCategory(
    @Param('categoryId') categoryId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    if (page && limit) {
      if (isNaN(pageNum) || pageNum <= 0 || isNaN(limitNum) || limitNum <= 0) {
        throw new BadRequestException(
          'Page and limit must be positive numbers.',
        );
      }
    }
    return this._productsService.findByCategory(categoryId, pageNum, limitNum);
  }

  @Patch(':id')
  // @CheckId('products', 'id')
  // @CheckId('products', 'categoryId')
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this._productsService.update(id, updateProductDto, files);
  }

  @Delete(':id')
  @CheckId('products', 'id')
  remove(@Param('id') id: string) {
    return this._productsService.remove(id);
  }
}
