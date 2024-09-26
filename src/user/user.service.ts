import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {
  EntityManager,
  UniqueConstraintViolationException,
} from '@mikro-orm/postgresql';
import { User } from './entities/user.entity';
import { hashPassword } from '../common/helpers';
import { UserCreateResponseDto } from '../user/dto/response-create-user.dto'


@Injectable()
export class UserService {
  constructor(private readonly entityManager: EntityManager) { }

  async create(createUserDto: CreateUserDto): Promise<UserCreateResponseDto> {

    const { email, password } = createUserDto;

    await this.ensureEmailIsUnique(email);

    const hashedPassword = await hashPassword(password);

    const newUser = this.buildUser(createUserDto, hashedPassword);

    await this.entityManager.persistAndFlush(newUser);

    console.log(newUser)

    return new UserCreateResponseDto(newUser);

  }

  async findUserById(userId: number): Promise<User> {
    const user = await this.entityManager.findOne(User, userId)
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.entityManager.findOne(User, { email: email });
    return user;
  }

  public async ensureEmailIsUnique(email: string): Promise<void> {
    const existingUser = await this.entityManager.findOne(User, { email });

    if (existingUser) {
      throw new UniqueConstraintViolationException(
        new Error(`A user with email ${email} already exists.`),
      );
    }
  }

  public buildUser(createUserDto: CreateUserDto, hashedPassword: string): User {
    const user = new User();
    this.entityManager.assign(user, {
      ...createUserDto,
      password: hashedPassword,
    });
    return user;
  }

}
