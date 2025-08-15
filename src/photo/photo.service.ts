import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhotoService {
  constructor(private prismaService: PrismaService) {}
  saveTemporaryPhoto(file: Express.Multer.File) {
    // Retorna la información de la foto subida
    return {
      filename: file.filename,
      path: file.path,
    };
  }
}
