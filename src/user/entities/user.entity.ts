import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Customer } from 'src/customer/entities/customer.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';

@Entity({ tableName: 'tab_users' })
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property({ unique: true })
  username!: string;

  @Property({ unique: true })
  email!: string;

  @Property()
  password!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ nullable: true })
  deletedAt?: Date;

  @Property({ columnType: 'enum' })
  accountStatus: 'active' | 'suspended' | 'inactive' = 'active';

  @OneToOne(() => Customer, customer => customer.user, { nullable: true, owner: true })
  customer?: Customer;

  @OneToOne(() => Restaurant, restaurant => restaurant.user, { nullable: true, owner: true })
  restaurant?: Restaurant;
}
