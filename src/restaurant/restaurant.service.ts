import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const restaurant = new Restaurant();

    this.entityManager.assign(restaurant, createRestaurantDto);

    this.entityManager.persistAndFlush(restaurant);

    return restaurant;
  }
}
