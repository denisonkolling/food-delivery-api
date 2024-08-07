import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = new Customer();
    this.entityManager.assign(customer, createCustomerDto);

    try {
      await this.entityManager.persistAndFlush(customer);
    } catch (error) {
      if (error) {
        throw new Error('Error during saving Customer data');
      }
      throw error;
    }

    return customer;
  }
}
