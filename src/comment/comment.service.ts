import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(createCommentDto: CreateCommentDto) {
    return await this.prismaService.comment.create({
      data: {
        comment: createCommentDto.comment,
        author: {
          connect: { id: createCommentDto.authorId }, // relación con usuario
        },
        post: {
          connect: { id: createCommentDto.postId }, // relación con post
        },
      },
    });
  }
  async listComments() {
    return await this.prismaService.comment.findMany({
      include: {
        author: true,
        post: true,
      },
    });
  }

  async deleteComment(id: number) {
    return await this.prismaService.comment.delete({
      where: { id },
    });
  }

  async updateComment(id: number, updateCommentDto: CreateCommentDto) {
    return await this.prismaService.comment.update({
      where: { id },
      data: {
        comment: updateCommentDto.comment,
        author: {
          connect: { id: updateCommentDto.authorId },
        },
        post: {
          connect: { id: updateCommentDto.postId },
        },
      },
    });
  }
}
