import { User } from '../entities/user.entity'

export class UserResponseDto {
  id: number;
  email: string;
  createdAt: Date;
  deletedAt?: Date;
  accountStatus: 'active' | 'suspended' | 'inactive';
  customerId?: number;
  firstName?: string;
  lastName?: string;
  restaurantId?: number;
  restaurantName?: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.deletedAt = user.deletedAt;
    this.accountStatus = user.accountStatus;
    this.customerId = user.customer.id;
    this.firstName = user.customer.firstName;
    this.lastName = user.customer.lastName;
    this.restaurantId = user.restaurant.id;
    this.restaurantName = user.restaurant.restaurantName;
  }
}