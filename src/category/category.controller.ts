import { Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('category')
export class CategoryController {
  constructor(private categoryServices: CategoryService) {}

  @Post()
  createCategory(): Promise<Category[]> {
    return this.categoryServices.createAll();
  }

  @Get()
  getAllCategory(): Promise<Category[]> {
    return this.categoryServices.getAll();
  }

  @Get(':id')
  getOneCategory(@Param('id') id: number): Promise<Category | HttpException> {
    return this.categoryServices.getOneById(id);
  }
}
