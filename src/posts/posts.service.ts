import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditPostDto } from './dto/EditPostDto';
import { CreatePostDto } from './dto/CreatePostDto';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}
  //aca esta el nombre del metodo y en este metodo resibe el objto tipado
  async createPost(createPostDto: CreatePostDto) {
    const post = await this.prismaService.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        author: {
          connect: { id: createPostDto.authorId }, // relación con usuario
        },
        // Relación con categorías
        postCategories: {
          create: createPostDto.categories.map((categoryId) => ({
            categoriesId: categoryId,
          })),
        },
      },
    });
    // for (const categoryId of createPostDto.categories) {
    //   return await this.prismaService.postCategories.create({
    //     data: {
    //       postId: post.id,
    //       categoriesId: categoryId,
    //     },
    //   });
    // }
    return post;
  }

  async findAll() {
    return this.prismaService.post.findMany({
      include: {
        postCategories: {
          include: {
            categorie: true, // incluir la información de la categoría
          },
        },
      },
    });
  }
  async findOne(id: number) {
    return await this.prismaService.post.findUnique({
      where: { id },
      include: {
        likes: true, // incluir los likes
      },
    });
  }
  async deletePost(id: number) {
    //where nos sirve para identificar que  parte va afectar por ejemplo el id
    await this.prismaService.post.delete({ where: { id } });
  }

  async updatePosts(id: number, editDto: EditPostDto) {
    return await this.prismaService.post.update({
      where: { id: id },
      data: {
        title: editDto.title,
        content: editDto.content,
      },
    });
  }
}
