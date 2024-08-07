import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'tab_categories' })
export class Category {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;
}
