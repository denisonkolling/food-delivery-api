import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'tab_users' })
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  username!: string;

  @Property({ type: 'bigint' })
  document!: number;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ default: false })
  isDeleted: boolean = false;
}
