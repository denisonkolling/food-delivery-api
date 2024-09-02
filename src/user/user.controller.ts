import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findUserByEmail(@Query('email') email: string) {
    return this.userService.findByEmail(email);

  }
}
