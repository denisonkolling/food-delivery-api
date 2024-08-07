import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemService {
  create(createOrderItemDto: CreateOrderItemDto) {
    return 'This action adds a new orderItem';
  }

}
