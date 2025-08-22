import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EditPostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
