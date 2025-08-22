import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsService } from './posts/posts.service';
import { UserModule } from './user/user.module';
import { CategoriesModule } from './categories/categories.module';
import { SearchModule } from './search/search.module';
import { CommentModule } from './comment/comment.module';
import { LikesModule } from './likes/likes.module';
import { AuthModule } from './auth/auth.module';
import { PhotoModule } from './photo/photo.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'), // carpeta donde guardaremos las fotos
      serveRoot: '/uploads', // se expondrá en http://host:puerto/uploads/...
    }),
    PostsModule,
    PrismaModule,
    UserModule,
    CategoriesModule,
    SearchModule,
    CommentModule,
    LikesModule,
    AuthModule,
    PhotoModule,
  ],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsService],
})
export class AppModule {}
