import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { OrderItem } from './entities/order-item.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderItemService {

  constructor(private readonly entityManager: EntityManager) { }

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {

    const orderItem = new OrderItem();

    this.entityManager.assign(orderItem, createOrderItemDto);

    const order = await this.entityManager.findOne(Order, orderItem.order);

    orderItem.order = order;

    const product = await this.entityManager.findOne(Product, orderItem.product);

    orderItem.product = product;

    orderItem.price = product.price;

    return orderItem;

  }

  createOrderItem(order: Order, product: Product, quantity: number, price: number): OrderItem {
    const orderItem = new OrderItem();
    orderItem.order = order;
    orderItem.product = product;
    orderItem.quantity = quantity;
    orderItem.price = price;
    order.orderItems.add(orderItem);
    return orderItem;
  }

}
