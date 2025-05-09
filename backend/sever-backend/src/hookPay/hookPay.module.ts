import { Module } from '@nestjs/common';
import { HookPayController } from './hookPay.controller';
import { HookPayService } from './hookPay.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { NotificationGateway } from '@/NotificationGateway/notification.gateway';
import { OrdersModule } from '@/orders/orders.module';
import { OrderDetailsModule } from '@/order-details/order-details.module';
@Module({
  imports: [PrismaModule, OrdersModule, OrderDetailsModule],
  controllers: [HookPayController],
  providers: [HookPayService, NotificationGateway],
})
export class HookPayModule {}
