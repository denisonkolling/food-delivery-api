import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { Category } from 'src/category/entities/category.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';

@Entity({ tableName: 'tab_products' })
export class Product {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  price!: number;

  @Property()
  description!: string;

  @ManyToOne(() => Restaurant)
  restaurant!: Restaurant;

  @ManyToMany(() => Category)
  categories = new Collection<Category>(this);
}
