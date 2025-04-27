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
  UploadedFile,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly _categoriesService: CategoriesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this._categoriesService.create(createCategoryDto, file);
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
    return this._categoriesService.findAll(pageNum, limitNum, newSearch);
  }

  @Get(':id')
  @CheckId('categories', 'id')
  findOne(@Param('id') id: string) {
    return this._categoriesService.findOne(id);
  }

  @Patch(':id')
  @CheckId('categories', 'id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this._categoriesService.update(id, updateCategoryDto, file);
  }

  @Delete()
  removeMany(@Body('ids') ids: string[]) {
    return this._categoriesService.removeManyCategories(ids);
  }
}
