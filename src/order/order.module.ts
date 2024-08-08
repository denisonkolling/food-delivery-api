import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProductModule } from 'src/product/product.module';
import { CustomerModule } from 'src/customer/customer.module';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({
  imports: [MikroOrmModule.forFeature([Order]),
  ProductModule,
  CustomerModule,
  RestaurantModule,
],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule {}
