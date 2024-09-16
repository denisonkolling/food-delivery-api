export class CreateProductDto {
  name: string;
  price: number;
  description: string;
  restaurant: number;
  category: number[];
  imageUrl: string;
}
