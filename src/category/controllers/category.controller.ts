import { Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { CategoryService } from '@/categoryService/category.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDoc } from '@/categoryDoc/category.doc';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private categoryServices: CategoryService) {}

  @ApiOkResponse({
    type: CategoryDoc,
  })
  @Post()
  createCategory(): Promise<CategoryDoc[]> {
    return this.categoryServices.createAll();
  }

  @ApiOkResponse({
    description: 'Category found',
    type: CategoryDoc,
  })
  @ApiBadRequestResponse({
    description: 'Category not found',
    status: 404,
  })
  @Get()
  getAllCategory(): Promise<CategoryDoc[]> {
    return this.categoryServices.getAll();
  }

  @ApiOkResponse({
    description: 'Category found',
    type: CategoryDoc,
  })
  @ApiBadRequestResponse({
    description: 'Category not found',
    status: 404,
  })
  @Get(':id')
  getOneCategory(
    @Param('id') id: number,
  ): Promise<CategoryDoc | HttpException> {
    return this.categoryServices.getOneById(id);
  }
}
