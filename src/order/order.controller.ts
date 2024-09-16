import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { OrderResponseDTO } from './dto/order-response.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<OrderResponseDTO> {
    return await this.orderService.findById(+id);
  }

}
