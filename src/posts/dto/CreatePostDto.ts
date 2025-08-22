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
  @Type(() => Number)
  @IsNumber({}, { each: true })
  categories: number[];

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  photos: string[];
}
