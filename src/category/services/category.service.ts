import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
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
        name: 'Adventure',
      },
      {
        name: 'Fantasy',
      },
      {
        name: 'Horror',
      },
      {
        name: 'Thriller',
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
    try {
      const category: any = await this.categroyRepository.findOneOrFail({
        where: { id },
      });
      const categoryPlain = plainToInstance(CategoryDoc, category);
      return categoryPlain;
    } catch (error) {
      throw new NotFoundException('Category not found');
    }
  }
}
