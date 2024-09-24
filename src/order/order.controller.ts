import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { OrderResponseDTO } from './dto/order-response.dto';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of all orders' })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an order by its ID' })
  async findById(@Param('id') id: number): Promise<OrderResponseDTO> {
    return await this.orderService.findById(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order by its ID' })
  async deleteById(@Param('id') id: number): Promise<OrderResponseDTO> {
    return await this.orderService.deleteById(+id);
  }

}
