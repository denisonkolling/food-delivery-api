import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import {
  EntityManager,
  UniqueConstraintViolationException,
} from '@mikro-orm/postgresql';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly entityManager: EntityManager) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.entityManager.findOne(User, {
        email: createUserDto.email,
      });

      if (existingUser) {
        throw new UniqueConstraintViolationException(
          new Error(`An user with email ${createUserDto.email}already exists.`),
        );
      }

      const user = new User();
      this.entityManager.assign(user, createUserDto);
      await this.entityManager.persistAndFlush(user);

      return user;

    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while saving user data',
      );
    }
  }
}
