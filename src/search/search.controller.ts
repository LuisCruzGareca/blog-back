import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  //define una ruta  hhtp Get
  //:page es un parámetro dinámico que se captura de la URL
  @Get('/posts/list/:page')
  //Extrae el parámetro 'page' de la URL
  async searchPostPage(@Param('page', ParseIntPipe) page: number) {
    //- Llama al método searchPostPage del servicio searchService
    await this.searchService.searchPostPage(page);
  }
}
