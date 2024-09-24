import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Restaurant } from './entities/restaurant.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RestaurantService {
  constructor(private readonly entityManager: EntityManager,
    private readonly userService: UserService,
  ) { }

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {

    const user = await this.userService.findUserById(createRestaurantDto.userId);

    try {
      await this.ensureUserHasNoRestaurant(user);
    } catch (error) {
      console.error('Error while ensuring user has no restaurant:', error);
      throw error;
    }

    const restaurant = this.buildRestaurant(createRestaurantDto, user);

    try {
      await this.persistRestaurant(restaurant);
    } catch (error) {
      console.error('Error while persisting restaurant:', error);
      throw error;
    }

    return restaurant;
  }

  private async ensureUserHasNoRestaurant(user: User): Promise<void> {
    const existingRestaurant = await this.entityManager.findOne(Restaurant, { user });
    if (existingRestaurant) {
      throw new ConflictException('User already has a restaurant');
    }
  }

  private buildRestaurant(createRestaurantDto: CreateRestaurantDto, user: User): Restaurant {
    const { userId, ...dtoWithoutUserId } = createRestaurantDto;
    const restaurant = new Restaurant();
    restaurant.user = user;
    this.entityManager.assign(restaurant, dtoWithoutUserId);
    return restaurant;
  }

  private async persistRestaurant(restaurant: Restaurant): Promise<void> {
    await this.entityManager.persistAndFlush(restaurant);
  }

  async findOne(id: number): Promise<Restaurant> {
    const restaurant = await this.entityManager.findOne(Restaurant, id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id ${id} not found`);
    }
    return restaurant;
  }

  async findAll(): Promise<Restaurant[]> {
    return await this.entityManager.find(Restaurant, {});
  }
}
