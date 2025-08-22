import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsService } from './posts.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { PhotoService } from 'src/photo/photo.service';

@Module({
  imports: [CategoriesModule],
  controllers: [PostsController],
  providers: [PostsService, PrismaService, PhotoService],
})
export class PostsModule {}
