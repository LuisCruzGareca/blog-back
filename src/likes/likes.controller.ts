import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  async togleLike(@Body() body: { userId: number; postId: number }) {
    return this.likesService.togleLike(body.userId, body.postId);
  }
  @Get(':postId')
  async namberLikes(@Param('postId', ParseIntPipe) postId: number) {
    return this.likesService.namberLikes(postId);
  }

  @Get(':postId/user/:userId')
  async checkUserLike(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ) {
    return this.likesService.checkUserLike(Number(postId), Number(userId));
  }
}
