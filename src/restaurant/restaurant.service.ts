import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  create(createRestaurantDto: CreateRestaurantDto) {
    return 'This action adds a new restaurant';
  }
  
}
