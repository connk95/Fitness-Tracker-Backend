import {
  IsString,
  MinLength,
  IsArray,
  IsNumber,
  MaxLength,
} from 'class-validator';
import { Comments } from 'src/comments/comment.model';

export class InsertFoodDto {
  @IsString()
  type: string;

  @IsString()
  @MinLength(1)
  title: string;

  @IsNumber()
  @MaxLength(4)
  calories: number;

  @IsString()
  user: string;
}

export class UpdateFoodDto {
  @IsString()
  @MinLength(1)
  title?: string;

  @IsNumber()
  @MaxLength(4)
  calories?: number;

  @IsArray()
  likes?: [];

  @IsArray()
  comments?: Comments[];

  @IsString()
  newCommentId?: string;

  @IsString()
  user: string;
}
