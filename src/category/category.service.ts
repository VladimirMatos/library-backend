import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categroyRepository: Repository<Category>,
  ) {}

  createAll(): Promise<Category[]> {
    const seed = [
      {
        name: 'Action',
      },
      {
        name: 'Adventure',
      },
      {
        name: 'Fantasy',
      },
      {
        name: 'General Fiction',
      },
      {
        name: 'Historical Fiction',
      },
      {
        name: 'Horror',
      },
      {
        name: 'Humor',
      },
      {
        name: 'Thriller',
      },
      {
        name: 'Non-Fiction',
      },
      {
        name: 'Paranormal',
      },
      {
        name: 'Poetry',
      },
      {
        name: 'Romance',
      },
      {
        name: 'Science Fiction',
      },
    ];
    const category = this.categroyRepository.create(seed);
    return this.categroyRepository.save(category);
  }

  getAll(): Promise<Category[]> {
    return this.categroyRepository.find();
  }

  async getOneById(id: number): Promise<Category | HttpException> {
    const category: any = await this.categroyRepository.findOne({
      where: { id },
    });

    if (!category) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return category;
  }
}
