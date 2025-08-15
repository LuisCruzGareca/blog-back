import {
  BadRequestException,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

@Controller('photo')
export class PhotoController {
  constructor(
    private readonly photoService: PhotoService,
    private readonly configService: ConfigService,
  ) {}
  @Post('')
  //Capturar y procesar el archivo antes de tu lógica
  //Cuando llega una petición multipart/form-data con un archivo (como una imagen), NestJS por defecto no sabe cómo manejarlo.
  @UseInterceptors(
    //Lo procesa con Multer (la librería que hace todo el trabajo de leer, validar y guardar).
    FileInterceptor('file', {
      //storage::En este contexto de subir fotos con NestJS y Multer, el storage es la configuración que le dice a Multer dónde y cómo guardar el archivo que recibes.
      //diskStorage ::dice: “guarda este archivo físicamente en una carpeta de mi servidor”.
      storage: diskStorage({
        //define en qué carpeta se va a guardar el archivo.s
        destination: (req, file, callback) => {
          //define con qué nombre se va a guardar el archivo.
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
          callback(null, `${filename}.jpg`); // ✅ sin símbolo $
        },
      }),
    }),
  )
  async uploadNewPhoto(@UploadedFile() file: Express.Multer.File) {
    return {
      photo: this.configService.get<string>('PHOTOS_TMP_URL') + file.filename,
      filename: file.filename,
    };
  }
}
