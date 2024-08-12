import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  OneToOne,
} from '@mikro-orm/core';
import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';

@Entity({ tableName: 'tab_customers' })
export class Customer {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ unique: true })
  email!: string;

  @Property()
  password!: string;

  @Property()
  address!: string;

  @Property()
  phoneNumber!: string;

  @OneToOne(() => User, user => user.customer,  { mappedBy: 'customer' })
  user!: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders = new Collection<Order>(this);
}
