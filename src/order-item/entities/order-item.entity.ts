import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity({ tableName: 'tab_order_items' })
export class OrderItem {
  @PrimaryKey()
  id!: number;

  @Property()
  quantity!: number;

  @Property()
  price!: number;

  @ManyToOne(() => Order)
  order!: Order;

  @ManyToOne(() => Product)
  product!: Product;
}
