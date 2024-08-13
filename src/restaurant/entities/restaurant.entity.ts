import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  OneToOne,
} from '@mikro-orm/core';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Entity({ tableName: 'tab_restaurants' })
export class Restaurant {
  @PrimaryKey()
  id!: number;

  @OneToOne(() => User, user => user.restaurant, { mappedBy: 'restaurant', owner: true, unique: true })
  user!: User;

  @Property()
  restaurantName!: string;

  @Property()
  cuisineType!: string;

  @Property()
  address!: string;

  @Property()
  phoneNumber!: string;

  @OneToMany(() => Product, product => product.restaurant)
  products = new Collection<Product>(this);

  @OneToMany(() => Order, order => order.restaurant)
  orders = new Collection<Order>(this);
}
