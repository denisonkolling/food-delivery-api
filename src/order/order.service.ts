import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Order } from './entities/order.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { CustomerService } from 'src/customer/customer.service';
import { ProductService } from 'src/product/product.service';
import { OrderItemService } from 'src/order-item/order-item.service';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { OrderMapper } from 'src/order-item/mappers/order.mapper';
import { OrderResponseDTO } from './dto/order-response.dto';

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
      const product = await this.productService.findOne(item.productId);

      if (!product) {
        throw new NotFoundException(`Product with id ${item.productId} not found`);
      }

      const orderItem = this.orderItemService.createOrderItem(order, product, item.quantity, product.price);
      totalOrderValue += orderItem.price * orderItem.quantity;
    }

    order.total = totalOrderValue;

    const restaurant = await this.restaurantService.findOne(createOrderDto.restaurantId);
    order.restaurant = restaurant;

    const customer = await this.customerService.findById(createOrderDto.customerId);
    order.customer = customer;

    this.entityManager.persistAndFlush(order);
    return order;
  }

  async findAll(): Promise<Order[]> {
    return await this.entityManager.find(Order, {});
  }

  async findById(id: number): Promise<OrderResponseDTO> {
    const order = await this.entityManager.findOne(Order, id, {
      populate: ['orderItems.product'],
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return OrderMapper.toOrderResponseDTO(order);
  }
}
