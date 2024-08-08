export class CreateOrderDto {
    customer: { id: number };
    restaurant: { id: number };
    status: string;
    items: { productNumber: number; quantity: number }[];
}
