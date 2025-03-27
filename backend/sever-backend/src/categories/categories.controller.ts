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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly _categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this._categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this._categoriesService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @CheckId('categories', 'id')
  findOne(@Param('id') id: string) {
    return this._categoriesService.findOne(id);
  }

  @Patch(':id')
  @CheckId('categories', 'id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this._categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @CheckId('categories', 'id')
  remove(@Param('id') id: string) {
    return this._categoriesService.remove(id);
  }
}
