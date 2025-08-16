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

    return this.likesService.toggleLike(userId, postId);
  }
  @Get('post/:postId')
  async namberLikes(@Param('postId', ParseIntPipe) postId: number) {
    return this.likesService.namberLikes(postId);
  }
  @Get('user/:postId')
  @UseGuards(AuthGuard('jwt'))
  async checkUserLike(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req,
  ) {
    console.log('User en req:', req.user); //

    const userId = (req.user as { id: number }).id;

    return this.likesService.checkUserLike(postId, userId);
  }
}
