import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToMany,
  OneToOne,
  Collection,
} from '@mikro-orm/core';
import { Customer } from 'src/customer/entities/customer.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';

@Entity({ tableName: 'tab_orders' })
export class Order {
  @PrimaryKey()
  id!: number;

  @Property()
  orderDate: Date = new Date();

  @Property()
  status!: string;

  @Property()
  totalAmount!: number;

  @ManyToOne(() => Customer)
  customer!: Customer;

  @ManyToOne(() => Restaurant)
  restaurant!: Restaurant;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems = new Collection<OrderItem>(this);

  @OneToOne(() => Payment, (payment) => payment.order, { mappedBy: 'order' })
  payment?: Payment;
}
