import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/CreateDto.dto';
import { EditPostDto } from './dto/editDto.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Post('create')
  createPost(@Body() createPostDto: CreatePostDto) {
    this.postService.createPost(createPostDto);
    return { message: 'ok' };
  }
  @Get('list')
  findAll() {
    //retorname el objeto que esta en postService con el nombre que cree que es findAll
    return this.postService.findAll();
  }
  @Delete(':id')
  //@param toma el url  (/post/10) y y extrae el parametro como id parceIntPipe comprueba si es un numero  y el di;number declar que id sea un numero
  async deletePost(@Param(':id', ParseIntPipe) id: number) {
    return this.postService.deletePost(id);
  }

  @Patch('edit')
  updatePosts(@Body() editPostDto: EditPostDto) {
    this.postService.updatePosts(editPostDto);
    return { message: 'ok' };
  }
}
