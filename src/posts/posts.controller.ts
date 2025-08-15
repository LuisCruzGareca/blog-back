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
import { CreatePostDto } from './dto/CreateDto.dto';
import { EditPostDto } from './dto/editDto.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Post('create')
  async createPost(@Body() createPostDto: CreatePostDto) {
    await this.postService.createPost(createPostDto);
    return { message: 'ok' };
  }
  // @UseGuards(AuthGuard('jwt'))
  @Get('list')
  findAll() {
    //retorname el objeto que esta en postService con el nombre que cree que es findAll
    return this.postService.findAll();
  }

  @Get('/list/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
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
