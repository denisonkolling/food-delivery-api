import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Order } from './entities/order.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { CustomerService } from 'src/customer/customer.service';
import { ProductService } from 'src/product/product.service';
import { OrderItemService } from 'src/order-item/order-item.service';

@Injectable()
export class OrderService {

  constructor(private readonly entityManager: EntityManager,
    private readonly restaurantService: RestaurantService,
    private readonly customerService: CustomerService,
    private readonly productService: ProductService,
    private readonly orderItemService: OrderItemService,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = new Order();

    order.status = createOrderDto.status;
    let totalOrderValue = 0;

    for (const item of createOrderDto.items) {
      const product = await this.productService.findOne(item.productNumber);

      if (!product) {
        throw new NotFoundException(`Product with id ${item.productNumber} not found`);
      }

      const orderItem = this.orderItemService.createOrderItem(order, product, item.quantity, product.price);
      totalOrderValue += orderItem.price * orderItem.quantity;
    }

    order.totalAmount = totalOrderValue;

    const restaurant = await this.restaurantService.findOne(createOrderDto.restaurant.id);
    order.restaurant = restaurant;

    const customer = await this.customerService.findOne(createOrderDto.customer.id);
    order.customer = customer;

    this.entityManager.persistAndFlush(order);
    return order;
  }
}
