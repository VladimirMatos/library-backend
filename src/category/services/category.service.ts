import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { Category } from '@/categoryEntity/category.entity';
import { CategoryDoc } from '@/categoryDoc/category.doc';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categroyRepository: Repository<Category>,
  ) {}

  async createAll(): Promise<CategoryDoc[]> {
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
    const categoryCreated = await this.categroyRepository.save(category);
    const categoryPlain = plainToInstance(CategoryDoc, categoryCreated);
    return categoryPlain;
  }

  async getAll(): Promise<CategoryDoc[]> {
    const category = await this.categroyRepository.find();
    const categoryPlain = plainToInstance(CategoryDoc, category);
    return categoryPlain;
  }

  async getOneById(id: number): Promise<CategoryDoc | HttpException> {
    const category: any = await this.categroyRepository.findOneOrFail({
      where: { id },
    });

    const categoryPlain = plainToInstance(CategoryDoc, category);
    return categoryPlain;
  }
}
