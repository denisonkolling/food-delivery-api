import { Entity, PrimaryKey, Property, OneToOne } from '@mikro-orm/core';
import { Order } from 'src/order/entities/order.entity';

@Entity({ tableName: 'tab_payments' })
export class Payment {
  @PrimaryKey()
  id!: number;

  @Property()
  paymentDate: Date = new Date();

  @Property()
  amount!: number;

  @Property()
  paymentMethod!: string;

  @Property()
  status!: string;

  @OneToOne(() => Order, (order) => order.payment, { owner: true })
  order!: Order;
}
