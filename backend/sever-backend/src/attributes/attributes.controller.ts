import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
// import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('attributes')
export class AttributesController {
  constructor(private readonly _attributesService: AttributesService) {}

  @Post()
  @CheckId('categories', 'categoryId')
  create(@Body() createAttributeDto: CreateAttributeDto[]) {
    return this._attributesService.createMany(createAttributeDto);
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
    return this._attributesService.findAll(pageNum, limitNum);
  }

  @Get('/getList-attribute-by-categoryId/:categoryId')
  getListAttributeByCategoryId(
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
    return this._attributesService.getListAttributeByCategoryId(
      categoryId,
      pageNum,
      limitNum,
    );
  }

  @Get(':id')
  @CheckId('attributes', 'id')
  findOne(@Param('id') id: string) {
    return this._attributesService.findOne(id);
  }

  // @Patch(':id')
  // @CheckId('attributes', 'id')
  // @CheckId('categories', 'categoryId')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateAttributeDto: UpdateAttributeDto,
  // ) {
  //   return this._attributesService.update(id, updateAttributeDto);
  // }

  // @Delete(':id')
  // @CheckId('attributes', 'id')
  // remove(@Param('id') id: string) {
  //   return this._attributesService.remove(id);
  // }
}
