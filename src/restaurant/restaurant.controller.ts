import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Restaurant> {
    return await this.restaurantService.findOne(+id);
  }

  @Get()
  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantService.findAll();
  }

}
