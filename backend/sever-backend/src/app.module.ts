import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { ValidationModule } from '@/validators/validation.module';
import { UsersModule } from './users/users.module';
import { LogsModule } from './logs/logs.module';
import { ShippingMethodsModule } from './shipping-methods/shipping-methods.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { CouponsModule } from './coupons/coupons.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { OrdersModule } from './orders/orders.module';
import { ImportDetailsModule } from './import-details/import-details.module';
import { ImportInvoicesModule } from './import-invoices/import-invoices.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { AttributeValuesModule } from './attribute-values/attribute-values.module';
import { AttributesModule } from './attributes/attributes.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolePermissionsModule } from './role-permissions/role-permissions.module';
import { RolesModule } from './roles/roles.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { CartsModule } from './carts/carts.module';

@Module({
  imports: [
    PrismaModule,
    ValidationModule,
    UsersModule,
    UserRolesModule,
    RolesModule,
    RolePermissionsModule,
    PermissionsModule,
    ProductsModule,
    CategoriesModule,
    ProductImagesModule,
    AttributesModule,
    AttributeValuesModule,
    SuppliersModule,
    ImportInvoicesModule,
    ImportDetailsModule,
    OrdersModule,
    OrderDetailsModule,
    ReviewsModule,
    CouponsModule,
    WishlistsModule,
    PaymentMethodsModule,
    ShippingMethodsModule,
    LogsModule,
    CartsModule,
  ],
})
export class AppModule {}
