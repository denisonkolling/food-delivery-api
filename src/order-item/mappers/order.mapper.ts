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
      restaurantId: order.restaurant.id,
      items: order.orderItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        productId: item.product.id,
        productName: item.product.name,
        price: parseFloat(item.product.price.toString()),
        productDescription: item.product.description,
        productImageUrl: item.product.imageUrl,
      }))
    };
  }
}
