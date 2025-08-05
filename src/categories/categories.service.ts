import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    await this.prismaService.categories.create({
      data: {
        name: createCategoryDto.name,
      },
    });
  }

  findAll() {
    return this.prismaService.categories.findMany();
  }
  async finAllWithPosts() {
    return await this.prismaService.categories.findMany({
      include: {
        postCategories: true,
      },
    });
  }
  findOne(id: number) {
    return this.prismaService.categories.findUnique({
      where: { id: id },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prismaService.categories.update({
      where: { id: id },
      data: {
        name: updateCategoryDto.name,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.categories.delete({
      where: { id: id },
    });
  }
}
