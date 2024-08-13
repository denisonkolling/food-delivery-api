import { User } from '../entities/user.entity'

export class UserResponseDto {
  id: number;
  email: string;
  createdAt: Date;
  deletedAt?: Date;
  accountStatus: 'active' | 'suspended' | 'inactive';

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.deletedAt = user.deletedAt;
    this.accountStatus = user.accountStatus;
  }
}