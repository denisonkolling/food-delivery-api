import { OrderItemResponseDTO } from "src/order-item/dto/order-item-response.dto";

export class OrderResponseDTO {
  id: number;
  createdAt: string;
  status: string;
  total: number;
  customerId: number;
  restaurantId: number;
  items: OrderItemResponseDTO[];
}