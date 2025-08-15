/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  IsNumber,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Type(() => Number)
  authorId: number; // Relación con User (author)

  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Type(() => Number)
  categories: number[];
}
