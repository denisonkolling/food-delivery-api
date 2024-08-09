import { ApiProperty } from '@nestjs/swagger'
import { OrderItemDto } from '../../order-item/dto/order-item.dto'
export class CreateOrderDto {
    @ApiProperty()
    customerId: number;
    @ApiProperty()
    restaurantId: number;
    @ApiProperty()
    status: string;
    @ApiProperty({ type: [OrderItemDto] })
    items: OrderItemDto[];
}
