import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import {
  EntityManager,
  UniqueConstraintViolationException,
} from '@mikro-orm/postgresql';
import { Customer } from './entities/customer.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CustomerService {
  constructor(private readonly entityManager: EntityManager,
    private readonly userService: UserService,
  ) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {

    const user = await this.userService.findUserById(createCustomerDto.userId);

    const customer = new Customer();

    customer.user = user;

    const { userId, ...dtoWithoutUserId } = createCustomerDto;

    this.entityManager.assign(customer, dtoWithoutUserId);

    await this.entityManager.persistAndFlush(customer);

    return customer;
  }

  async findOne(id: number) {
    const customer = await this.entityManager.findOne(Customer, id)

    return customer;
  }
}
