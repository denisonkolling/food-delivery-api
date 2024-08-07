import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity({ tableName: 'tab_restaurants' })
export class Restaurant {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  address!: string;

  @Property()
  phoneNumber!: string;

  @Property()
  cuisineType!: string;

  @OneToMany(() => Product, (product) => product.restaurant)
  products = new Collection<Product>(this);

  @OneToMany(() => Order, (order) => order.restaurant)
  orders = new Collection<Order>(this);
}
