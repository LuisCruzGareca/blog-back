/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Type(() => Number)
  authorId: number; // Relación con User (author)
}
