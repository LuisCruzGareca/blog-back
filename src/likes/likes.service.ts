import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private prismaService: PrismaService) {}

  async toggleLike(userId: number, postId: number) {
    if (!userId) {
      throw new UnauthorizedException('Debes iniciar sesión para dar like');
    }

    // Verificar que el post exista
    const postExists = await this.prismaService.post.findUnique({
      where: { id: postId },
    });

    if (!postExists) {
      throw new NotFoundException('El post no existe');
    }

    // Verificar si ya existe el like
    const existingLike = await this.prismaService.like.findUnique({
      where: { postId_userId: { userId, postId } },
    });

    if (existingLike) {
      await this.prismaService.like.delete({
        where: { postId_userId: { userId, postId } },
      });
      return { likedByUser: false, message: 'Like eliminado' };
    }

    await this.prismaService.like.create({
      data: { userId, postId },
    });

    return { likedByUser: true, message: 'Like agregado' };
  }

  async namberLikes(postId: number) {
    const count = await this.prismaService.like.count({
      where: { postId },
    });
    return { count, postId };
  }
  async checkUserLike(postId: number, userId: number) {
    const like = await this.prismaService.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });
    return { likedByUser: !!like };
  }
}
