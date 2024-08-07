import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { PaymentModule } from './payment/payment.module';
import { OrderItemModule } from './order-item/order-item.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    UserModule,
    ProductModule,
    RestaurantModule,
    OrderModule,
    OrderItemModule,
    CustomerModule,
    PaymentModule,
    OrderItemModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
