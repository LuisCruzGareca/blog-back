import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PhotoController],
  providers: [PhotoService, PrismaService],
  exports: [PhotoService],
})
export class PhotoModule {}
