import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhotoService {
  constructor(private prismaService: PrismaService) {}

  async createPhoto(postId: number, filename: string) {
    await this.prismaService.photo.create({
      data: {
        path: postId + '/' + filename,
        postId: postId,
      },
    });
  }
  async findById(id: number) {
    return await this.prismaService.photo.findUnique({
      where: { id },
    });
  }
  async deletePhoto(id: number) {
    await this.prismaService.photo.delete({ where: { id } });
  }
  async findByFilename(filename: string) {
    return await this.prismaService.photo.findFirst({
      where: {
        path: {
          endsWith: filename,
        },
      },
    });
  }
}
