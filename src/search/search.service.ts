import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { contains } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly prismaService: PrismaService,
    private configService: ConfigService,
  ) {}
  async searchPost(page: number, categoryName?: string, orderBy?: string) {
    let whereConditions = {};
    if (categoryName) {
      whereConditions = {
        postCategories: {
          some: {
            categorie: {
              name: {
                contains: categoryName,
              },
            },
          },
        },
      };
    }
    const contionsOrderBy = orderBy
      ? { [orderBy]: orderBy === 'name' ? 'asc' : 'desc' }
      : {};

    return this.prismaService.post.findMany({
      skip: (page - 1) * this.configService.get('POST_PAGE'),
      take: parseInt(this.configService.get('POST_PAGE') ?? '10'),
      orderBy: contionsOrderBy,
      include: {
        postCategories: {
          include: {
            categorie: true,
          },
        },
      },
      where: whereConditions,
    });
  }
  async totalPost(categoryName?: string) {
    let conditions = {};
    if (categoryName) {
      conditions = {
        //en postCategories
        postCategories: {
          //algunas
          some: {
            //categorias
            categorie: {
              //con el nombre
              name: {
                //contiene categriName
                contains: categoryName,
              },
            },
          },
        },
      };
    }
    return this.prismaService.post.count({
      //where bacio
      where: conditions,
    });
  }
}
