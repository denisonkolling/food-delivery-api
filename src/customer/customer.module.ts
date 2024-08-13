import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './entities/customer.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MikroOrmModule.forFeature([Customer]), UserModule],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService]
})
export class CustomerModule { }
