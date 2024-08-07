import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { EntityManager } from '@mikro-orm/core';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = new Category();

    this.entityManager.assign(category, createCategoryDto);

    await this.entityManager.persistAndFlush(category);

    return category;
  }

}
