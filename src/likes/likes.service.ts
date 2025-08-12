import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private prismaService: PrismaService) {}

  async togleLike(userId: number, postId: number) {
    const existingLike = await this.prismaService.like.findUnique({
      where: { postId_userId: { userId, postId } },
    });

    if (existingLike) {
      await this.prismaService.like.delete({
        where: { postId_userId: { userId, postId } },
      });
      return { message: 'Like eliminado' };
    }

    await this.prismaService.like.create({
      data: { userId, postId },
    });

    return { message: 'Like agregado' };
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
