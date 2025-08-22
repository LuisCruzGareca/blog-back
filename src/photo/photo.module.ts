import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PhotoController],
  providers: [PhotoService, PrismaService],
  exports: [PhotoService],
  imports: [ConfigModule],
})
export class PhotoModule {}
