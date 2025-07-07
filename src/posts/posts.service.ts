import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/CreateDto.dto';
import { EditPostDto } from './dto/editDto.dto';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}
  //aca esta el nombre del metodo y en este metodo resibe el objto tipado
  async createPost(createPostDto: CreatePostDto) {
    //y la linea de this esta diciendo al prisma que use la funcion create  para luego pasarle un objto a data con la informacion
    return this.prismaService.post.create({
      // en data estamos pasando toda la informacion a la base de datos
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        published: createPostDto.published ?? false, // por defecto false si no viene
        author: {
          connect: { id: createPostDto.authorId }, // relación con usuario
        },
      },
    });
  }

  async findAll() {
    return this.prismaService.post.findMany();
  }

  async deletePost(id: number) {
    //where nos sirve para identificar que  parte va afectar por ejemplo el id
    await this.prismaService.post.delete({ where: { id } });
  }

  async updatePosts(editDto: EditPostDto) {
    return await this.prismaService.post.update({
      where: { id: editDto.id },
      data: {
        title: editDto.title,
        content: editDto.content,
        published: editDto.published,
      },
    });
  }
}
