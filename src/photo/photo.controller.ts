import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  ParseIntPipe,
  BadRequestException,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { extname, join } from 'path';
import { existsSync, mkdirSync, unlink, unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { promisify } from 'util';

@Controller('photo')
export class PhotoController {
  constructor(
    private readonly photoService: PhotoService,
    private readonly configService: ConfigService,
  ) {}

  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath = `./uploads/tmp`;
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const filename =
            Date.now().toString(36) +
            '-' +
            Math.floor(Math.random() * 1e6).toString(36);

          const ext = extname(file.originalname);
          callback(null, `${filename}${ext}`);
        },
      }),
    }),
  )
  async uploadNewPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se subió ningún archivo');
    }
    return {
      photo: this.configService.get<string>('PHOTOS_TMP_URL') + file.filename,
      filename: file.filename,
    };
  }

  @Post(':postId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const postId = req.params.postId;
          const uploadPath = `./uploads/${postId}`; // Ruta dinámica para cada producto

          // Crear la  carpeta si no existe
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }

          callback(null, uploadPath); // Define el destino como laA carpeta del producto
        },

        filename: (req, file, callback) => {
          const filename =
            Date.now().toString(36) +
            '-' +
            Math.floor(Math.random() * 1e6).toString(36);
          const ext = extname(file.originalname);
          callback(null, `${filename}.jpg`);
        },
      }),
    }),
  )
  async uploadEditPhoto(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    if (!file) {
      throw new BadRequestException('No se subió ningún archivo');
    }
    await this.photoService.createPhoto(postId, file.filename);
    return {
      photo:
        (this.configService.get<string>('PHOTOS_BASE_URL') ?? '') +
        postId +
        '/' +
        file.filename,
    };
  }

  @Delete(':id')
  async deletePhoto(@Param('id', ParseIntPipe) id: number) {
    const unlinkAsync = promisify(unlink);
    const photo = await this.photoService.findById(id);
    const photoPath = './uploads/' + photo?.path;
    if (existsSync(photoPath)) {
      unlinkAsync(photoPath);
    }
    this.photoService.deletePhoto(id);
  }
  @Delete('by-filename/:filename')
  async deleteByFilename(@Param('filename') filename: string) {
    const photoPath = join('./uploads/tmp', filename);

    if (!existsSync(photoPath)) {
      throw new NotFoundException('Archivo no encontrado');
    }

    unlinkSync(photoPath); // Borra el archivo de forma síncrona

    return { message: 'Archivo eliminado correctamente' };
  }
}
