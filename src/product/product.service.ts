import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Product } from './entities/product.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product();
    const {
      categories: categoryIds,
      restaurant: restaurantId,
      ...productData
    } = createProductDto;

    this.entityManager.assign(product, productData);

    const restaurant = await this.entityManager.findOne(
      Restaurant,
      restaurantId,
    );

    if (!restaurant) {
      throw new NotFoundException(
        `Restaurant with id ${restaurantId} not found`,
      );
    }

    product.restaurant = restaurant;

    for (const categoryId of categoryIds) {
      const category = await this.entityManager.findOne(Category, categoryId);
      if (!category) {
        throw new NotFoundException(`Category with id ${categoryId} not found`);
      }
      product.categories.add(category);
    }

    // My Note -- Search for categories and throw exception without for loop --
    // const categories = await this.entityManager.find(Category, {
    //   id: { $in: categoryIds },
    // });
    //
    // categories.forEach((category) => product.categories.add(category));
    //
    // if (categories.length !== categoryIds.length) {
    //   throw new NotFoundException('One or more categories not found');
    // }

    await this.entityManager.persistAndFlush(product);

    return product;
  }
}
