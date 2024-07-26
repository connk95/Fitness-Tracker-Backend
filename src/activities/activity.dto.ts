import { IsString, MinLength, IsArray, IsNumber } from 'class-validator';
import { Comments } from 'src/comments/comment.model';

export class InsertActivityDto {
  @IsString()
  type: string;

  @IsString()
  @MinLength(1)
  title: string;

  @IsNumber()
  @MinLength(1)
  duration?: number;

  @IsNumber()
  @MinLength(1)
  calories: number;

  @IsString()
  user: string;
}

export class UpdateActivityDto {
  @IsString()
  @MinLength(1)
  title?: string;

  @IsNumber()
  @MinLength(1)
  duration?: number;

  @IsNumber()
  @MinLength(1)
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
