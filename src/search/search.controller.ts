import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SearchService } from './search.service';
import { ConfigService } from '@nestjs/config';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private configService: ConfigService,
  ) {}

  @Get('posts/list/:page')
  async findAll(@Param('page', ParseIntPipe) page: number) {
    //retorname el objeto que esta en postService con el nombre que cree que es findAll
    const posts = await this.searchService.searchPost(page);
    const totalPost = await this.searchService.totalPost();
    const totalPages = Math.ceil(
      totalPost / parseInt(this.configService.get('POST_PAGE') ?? '10'),
    );
    return { posts: posts, totalPages: totalPages };
  }
  //define una ruta  hhtp Get
  @Get('posts/list/:page/:categoryName')
  async searchPostCategory(
    @Param('page', ParseIntPipe) page: number,
    @Param('categoryName') categoryName?: string,
  ) {
    const posts = await this.searchService.searchPost(page, categoryName);
    const totalPost = await this.searchService.totalPost(categoryName);
    const totalPages = Math.ceil(
      totalPost / parseInt(this.configService.get('POST_PAGE') ?? '10'),
    );
    return { posts: posts, totalPages: totalPages };
  }

  //FILTRO POR ORDENACION
  @Get('posts/list/:page/:categoryName/:orderBy')
  async searchPostCategoryOrderby(
    @Param('page', ParseIntPipe) page: number,
    @Param('categoryName') categoryName?: string,
    @Param('orderBy') orderBy?: string,
  ) {
    categoryName = categoryName === 'all' ? undefined : categoryName;
    const posts = await this.searchService.searchPost(
      page,
      categoryName,
      orderBy,
    );
    const totalPost = await this.searchService.totalPost(categoryName);

    const totalPages = Math.ceil(
      totalPost / parseInt(this.configService.get('POST_PAGE') ?? '10'),
    );

    return { posts: posts, totalPages: totalPages };
  }

  //filtro por texto
  @Get('posts/:searchTxt')
  async searchPostTxt(@Param('searchTxt') searchTxt: string) {
    const posts = await this.searchService.searchPostByText(searchTxt);

    return { posts: posts, totalPages: 1 };
  }
}
