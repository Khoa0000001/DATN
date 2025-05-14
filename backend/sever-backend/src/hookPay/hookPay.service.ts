import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { OrderDetailsService } from '@/order-details/order-details.service';
import { OrdersService } from '@/orders/orders.service';
import { formatResponse } from '@/utils/response.util';
import { NotificationGateway } from '@/NotificationGateway/notification.gateway';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HookPayService {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _notificationGateway: NotificationGateway,
    private readonly _ordersService: OrdersService,
    private readonly _orderDetailsService: OrderDetailsService,
  ) {}
  private tempQRDataStore: Record<string, any> = [];
  async hookPay(data: any) {
    if (this.tempQRDataStore) {
      const content = data.content;
      const afterSEVQR = content.split('SEVQR ')[1]?.split(' ')[0];
      const dataCln = this.tempQRDataStore.find(
        (item) => item?.id === afterSEVQR,
      );
      const shippingInfo = dataCln?.shippingInfo;
      const listCarts = dataCln?.listCarts;
      const userId = shippingInfo?.userId;
      const order = await this._ordersService.create({
        userId: userId,
        nameCustomer: shippingInfo?.name,
        phoneCustomer: shippingInfo?.phone,
        address: shippingInfo?.address,
        timeOfReceipt: shippingInfo?.deliveryTime,
        paymentMethod: 'Thanh toán trực tuyến',
        shippingMethod: 'Giao hàng online',
        totalAmount: shippingInfo?.totalPrice,
        status: 'PROCESSING',
      });

      const createOrderDetailDtos = listCarts.map((item) => ({
        orderId: order?.data?.id,
        productId: item?.productId,
        quantity: item?.quantity,
        price: item?.price,
        totalPrice: item?.quantity * item?.price,
      }));

      await this._orderDetailsService.createMany(createOrderDetailDtos);
      await Promise.all(
        listCarts.map((item) =>
          this._prismaService.products.update({
            where: { id: item.productId },
            data: {
              quantity: {
                decrement: item.quantity,
              },
            },
          }),
        ),
      );

      // Gửi thông báo qua socket
      this._notificationGateway.sendPaymentSuccess(userId, {
        message: 'Bạn đã thanh toán thành công!',
      });
      return formatResponse('hook-pay', { success: true });
    } else {
      return formatResponse('hook-pay', { success: false });
    }
  }

  createQR(data: any) {
    const idRaw = uuidv4();
    const id = idRaw.replace(/-/g, '');
    const newData = {
      id,
      ...data,
    };
    this.tempQRDataStore.push(newData);
    console.log(
      'tempQRDataStore:',
      JSON.stringify(this.tempQRDataStore, null, 2),
    );
    return formatResponse('id-QR', { MaQR: id });
  }
}
