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
import { AttributeValuesService } from './attribute-values.service';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('attribute-values')
export class AttributeValuesController {
  constructor(
    private readonly _attributeValuesService: AttributeValuesService,
  ) {}

  @Post()
  @CheckId('products', 'productId')
  @CheckId('attributes', 'attributeId')
  create(@Body() createAttributeValueDto: CreateAttributeValueDto) {
    return this._attributeValuesService.create(createAttributeValueDto);
  }

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this._attributeValuesService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @CheckId('attributeValues', 'id')
  findOne(@Param('id') id: string) {
    return this._attributeValuesService.findOne(id);
  }

  @Patch(':id')
  @CheckId('attributeValues', 'id')
  @CheckId('products', 'productId')
  @CheckId('attributes', 'attributeId')
  update(
    @Param('id') id: string,
    @Body() updateAttributeValueDto: UpdateAttributeValueDto,
  ) {
    return this._attributeValuesService.update(id, updateAttributeValueDto);
  }

  @Delete(':id')
  @CheckId('attributeValues', 'id')
  remove(@Param('id') id: string) {
    return this._attributeValuesService.remove(id);
  }
}
