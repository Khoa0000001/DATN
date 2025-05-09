import { Controller, Post, Body } from '@nestjs/common';
import { HookPayService } from './hookPay.service';

@Controller('hook-pay')
export class HookPayController {
  constructor(private readonly _hookPayService: HookPayService) {}
  @Post()
  hookPay(@Body() data: any) {
    return this._hookPayService.hookPay(data);
  }

  @Post('creat-QR')
  createQR(@Body() data: any) {
    return this._hookPayService.createQR(data);
  }
}
