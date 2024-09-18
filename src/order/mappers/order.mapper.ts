import { OrderResponseDTO } from "src/order/dto/order-response.dto";
import { Order } from "src/order/entities/order.entity";

export class OrderMapper {
  static toOrderResponseDTO(order: Order): OrderResponseDTO {
    return {
      id: order.id,
      createdAt: order.createdAt.toISOString(),
      status: order.status,
      total: parseFloat(order.total.toString()),
      customerId: order.customer.id,
      customerName: order.customer.firstName + ' ' + order.customer.lastName,
      restaurantId: order.restaurant.id,
      restaurantName: order.restaurant.name,
      items: order.orderItems.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
        name: item.product.name,
        price: parseFloat(item.product.price.toString()),
        // productDescription: item.product.description,
        // productImageUrl: item.product.imageUrl,
      }))
    };
  }
}
