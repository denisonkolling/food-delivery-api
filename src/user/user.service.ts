import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import {
  EntityManager,
  UniqueConstraintViolationException,
} from '@mikro-orm/postgresql';
import { User } from './entities/user.entity';
import { hashPassword } from '../common/helpers';
import { UserResponseDto } from '../user/dto/response-user.dto'


@Injectable()
export class UserService {
  constructor(private readonly entityManager: EntityManager) { }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {

    const { email, password } = createUserDto;

    await this.ensureEmailIsUnique(email);

    const hashedPassword = await hashPassword(password);

    const newUser = this.buildUser(createUserDto, hashedPassword);

    await this.entityManager.persistAndFlush(newUser);

    return new UserResponseDto(newUser);
  }

  async findUserById(userId: number): Promise<User> {
    const user = await this.entityManager.findOne(User, userId)
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.entityManager.findOne(User, { email: email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async ensureEmailIsUnique(email: string): Promise<void> {
    const existingUser = await this.entityManager.findOne(User, { email });

    if (existingUser) {
      throw new UniqueConstraintViolationException(
        new Error(`A user with email ${email} already exists.`),
      );
    }
  }

  private buildUser(createUserDto: CreateUserDto, hashedPassword: string): User {
    const user = new User();
    this.entityManager.assign(user, {
      ...createUserDto,
      password: hashedPassword,
    });
    return user;
  }

}
