import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':postId')
  @UseGuards(AuthGuard('jwt'))
  async toggleLike(@Param('postId', ParseIntPipe) postId: number, @Req() req) {
    const userId = (req.user as { id: number }).id;

    return await this.likesService.toggleLike(userId, postId);
  }
  @Get('post/:postId')
  async numberLikes(@Param('postId', ParseIntPipe) postId: number) {
    return await this.likesService.numberLikes(postId);
  }
  @Get('user/:postId')
  @UseGuards(AuthGuard('jwt'))
  async checkUserLike(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req,
  ) {
    const userId = (req.user as { id: number }).id;

    return this.likesService.checkUserLike(postId, userId);
  }
}
