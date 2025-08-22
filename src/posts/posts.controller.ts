import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/CreatePostDto';
import { EditPostDto } from './dto/EditPostDto';
import { AuthGuard } from '@nestjs/passport';
import { existsSync, mkdirSync, renameSync } from 'fs';
import { PhotoService } from 'src/photo/photo.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postService: PostsService,
    private readonly photoService: PhotoService,
  ) {}

  @Post('create')
  async createPost(@Body() createPostDto: CreatePostDto) {
    console.log('Datos recibidos del frontend:', createPostDto);
    console.log('Fotos a procesar:', createPostDto.photos);

    // 1. Crear el post
    const post = await this.postService.createPost(createPostDto);
    const postFolder = `./uploads/${post.id}`;
    if (!existsSync(postFolder)) {
      mkdirSync(postFolder, { recursive: true });
    }

    // 3. Mover fotos desde /tmp y registrar en DB
    const savedPhotos: string[] = [];
    if (Array.isArray(createPostDto.photos)) {
      for (const filename of createPostDto.photos) {
        console.log('Procesando archivo:', filename); // <- aquí ve
        const tmpPath = `./uploads/tmp/${filename}`;
        const finalPath = `${postFolder}/${filename}`;
        if (existsSync(tmpPath)) {
          renameSync(tmpPath, finalPath);
          await this.photoService.createPhoto(post.id, filename);
          savedPhotos.push(filename);
        } else {
          console.warn('Archivo no encontrado en tmp:', tmpPath);
        }
      }
    }

    return {
      message: 'Post creado con fotos',
      post,
      photos: savedPhotos,
    };
  }
  // @UseGuards(AuthGuard('jwt'))
  @Get('list')
  findAll() {
    //retorname el objeto que esta en postService con el nombre que cree que es findAll
    return this.postService.findAll();
  }

  @Get('list/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.findOne(id);
  }

  @Delete(':id')
  //@param toma el url  (/post/10) y y extrae el parametro como id parceIntPipe comprueba si es un numero  y el di;number declar que id sea un numero
  async deletePost(@Param(':id', ParseIntPipe) id: number) {
    return this.postService.deletePost(id);
  }

  @Patch('edit/:id')
  updatePosts(
    @Param('id', ParseIntPipe) id: number,
    @Body() editPostDto: EditPostDto,
  ) {
    this.postService.updatePosts(+id, editPostDto);
    return { message: 'ok' };
  }
}
