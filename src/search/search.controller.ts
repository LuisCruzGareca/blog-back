import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SearchService } from './search.service';
import { ConfigService } from '@nestjs/config';
import { PostsService } from 'src/posts/posts.service';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private configService: ConfigService,
  ) {}

  @Get('posts/list/:page')
  findAll(@Param('page', ParseIntPipe) page: number) {
    //retorname el objeto que esta en postService con el nombre que cree que es findAll
    return this.searchService.searchPost(page);
  }
  //define una ruta  hhtp Get
  @Get('posts/list/:page/:categoryName')
  async searchPostCategory(
    @Param('page', ParseIntPipe) page: number,
    @Param('categoryName') categoryName?: string,
  ) {
    return this.searchService.searchPost(page, categoryName);
  }
}
