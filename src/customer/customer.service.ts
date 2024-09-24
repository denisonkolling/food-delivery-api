import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Customer } from './entities/customer.entity';
import { UserService } from 'src/user/user.service';
import { CustomerMapper } from './mapper/customer.mapper.dto';
import { CustomerResponseDTO } from './dto/customer-response.dto';

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

  async findCustomerById(id: number): Promise<Customer> {
    const customer = await this.entityManager.findOne(Customer, id)
    return customer;
  }

  async findById(id: number): Promise<CustomerResponseDTO> {
    const customer = await this.entityManager.findOne(Customer, id)
    return CustomerMapper.toCustomerResponseDTO(customer);
  }

  async findAll(): Promise<CustomerResponseDTO[]> {
    try {
      const customers = await this.entityManager.find(Customer, {});

      const customerDTOs = customers.map(customer => CustomerMapper.toCustomerResponseDTO(customer));

      return customerDTOs;

    } catch (error) {
      console.error('Erro ao buscar as ordens:', error);
      throw new Error('Não foi possível buscar as ordens no momento.');
    }
  }
}
