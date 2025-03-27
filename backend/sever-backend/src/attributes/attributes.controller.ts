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
import { AttributesService } from './attributes.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('attributes')
export class AttributesController {
  constructor(private readonly _attributesService: AttributesService) {}

  @Post()
  @CheckId('categories', 'categoryId')
  create(@Body() createAttributeDto: CreateAttributeDto) {
    return this._attributesService.create(createAttributeDto);
  }

  @Get()
  @CheckId('attributes', 'id')
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this._attributesService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @CheckId('attributes', 'id')
  findOne(@Param('id') id: string) {
    return this._attributesService.findOne(id);
  }

  @Patch(':id')
  @CheckId('attributes', 'id')
  @CheckId('categories', 'categoryId')
  update(
    @Param('id') id: string,
    @Body() updateAttributeDto: UpdateAttributeDto,
  ) {
    return this._attributesService.update(id, updateAttributeDto);
  }

  @Delete(':id')
  @CheckId('attributes', 'id')
  remove(@Param('id') id: string) {
    return this._attributesService.remove(id);
  }
}
