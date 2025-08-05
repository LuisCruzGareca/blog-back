import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('create')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get('list')
  findAll() {
    return this.categoriesService.findAll();
  }
  @Get('list/categorieWhithPosts')
  finAllWithPosts() {
    return this.categoriesService.finAllWithPosts();
  }
  @Get('list/:id')
  findOne(@Param('id') id: number) {
    return this.categoriesService.findOne(id);
  }

  @Patch('edit/:id')
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
