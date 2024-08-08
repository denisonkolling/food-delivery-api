import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import {
  EntityManager,
  UniqueConstraintViolationException,
} from '@mikro-orm/postgresql';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(private readonly entityManager: EntityManager) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const existingCustomer = await this.entityManager.findOne(Customer, {
      email: createCustomerDto.email,
    });

    if (existingCustomer) {
      throw new UniqueConstraintViolationException(
        new Error('A customer with this email already exists.'),
      );
    }
    const customer = new Customer();
    this.entityManager.assign(customer, createCustomerDto);

    await this.entityManager.persistAndFlush(customer);

    return customer;
  }

  async findOne(id: number) {
    const customer = await this.entityManager.findOne(Customer, id)

    return customer;
  }
}
