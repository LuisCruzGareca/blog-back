import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EditCommentDto {
  @IsString()
  @IsNotEmpty()
  comment: string;
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Type(() => Number)
  authorId: number; // Relación con User (author)
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Type(() => Number)
  postId: number; // Relación con Post (post)
}
