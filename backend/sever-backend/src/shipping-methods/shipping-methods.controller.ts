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
import { ShippingMethodsService } from './shipping-methods.service';
import { CreateShippingMethodDto } from './dto/create-shipping-method.dto';
import { UpdateShippingMethodDto } from './dto/update-shipping-method.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('shipping-methods')
export class ShippingMethodsController {
  constructor(
    private readonly _shippingMethodsService: ShippingMethodsService,
  ) {}

  @Post()
  create(@Body() createShippingMethodDto: CreateShippingMethodDto) {
    return this._shippingMethodsService.create(createShippingMethodDto);
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
    return this._shippingMethodsService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._shippingMethodsService.findOne(id);
  }

  @Patch(':id')
  @CheckId('shippingMethods', 'id')
  update(
    @Param('id') id: string,
    @Body() updateShippingMethodDto: UpdateShippingMethodDto,
  ) {
    return this._shippingMethodsService.update(id, updateShippingMethodDto);
  }

  @Delete(':id')
  @CheckId('shippingMethods', 'id')
  remove(@Param('id') id: string) {
    return this._shippingMethodsService.remove(id);
  }
}
