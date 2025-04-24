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
import { ProductImagesService } from './product-images.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('product-images')
export class ProductImagesController {
  constructor(private readonly _productImagesService: ProductImagesService) {}

  @Post()
  @CheckId('products', 'productId')
  create(
    @Body()
    createProductImageDto: CreateProductImageDto,
  ) {
    return this._productImagesService.create(createProductImageDto);
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
    return this._productImagesService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  @CheckId('productImages', 'id')
  findOne(@Param('id') id: string) {
    return this._productImagesService.findOne(id);
  }

  @Patch(':id')
  @CheckId('productImages', 'id')
  @CheckId('products', 'productId')
  update(
    @Param('id') id: string,
    @Body() updateProductImageDto: UpdateProductImageDto,
  ) {
    return this._productImagesService.update(id, updateProductImageDto);
  }

  @Delete()
  removeMany(@Body('ids') ids: string[]) {
    return this._productImagesService.removeMany(ids);
  }
}
