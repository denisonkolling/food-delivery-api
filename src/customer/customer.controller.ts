import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Customer } from './entities/customer.entity';
import { CustomerResponseDTO } from './dto/customer-response.dto';

@ApiBearerAuth()
@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<CustomerResponseDTO> {
    return await this.customerService.findById(+id);
  }

  @Get()
  async findAll(): Promise<CustomerResponseDTO[]> {
    return await this.customerService.findAll();
  }

}
