import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly prismaService: PrismaService,
    private configService: ConfigService,
  ) {}
  async searchPost(page: number, categoryName?: string) {
    //Es una consulta tipo SELECT * FROM Post WHERE ...
    return this.prismaService.post.findMany({
      skip: (page - 1) * this.configService.get('POST_PAGE'),
      take: parseInt(this.configService.get('POST_PAGE') ?? '10'),
      //Aquí filtramos los posts que tienen al menos una relación con postCategories que cumpla la condición interna.
      where: {
        postCategories: {
          //some significa "al menos uno": busca posts que tengan alguna categoría que coincida.
          some: {
            categorie: {
              name: {
                contains: categoryName,
              },
            },
          },
        },
      },
      //Esto indica que además de los datos del post, Prisma incluya también la información de las categorías relacionadas.
      include: {
        postCategories: {
          include: {
            categorie: true,
          },
        },
      },
    });
  }
}
