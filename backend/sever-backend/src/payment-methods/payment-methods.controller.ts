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
import { PaymentMethodsService } from './payment-methods.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly _paymentMethodsService: PaymentMethodsService) {}

  @Post()
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this._paymentMethodsService.create(createPaymentMethodDto);
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
    return this._paymentMethodsService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  @CheckId('paymentMethods', 'id')
  findOne(@Param('id') id: string) {
    return this._paymentMethodsService.findOne(id);
  }

  @Patch(':id')
  @CheckId('paymentMethods', 'id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    return this._paymentMethodsService.update(id, updatePaymentMethodDto);
  }

  @Delete(':id')
  @CheckId('paymentMethods', 'id')
  remove(@Param('id') id: string) {
    return this._paymentMethodsService.remove(id);
  }
}
