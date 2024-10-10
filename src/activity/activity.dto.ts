import { IsString, MinLength, IsArray, IsNumber } from 'class-validator';
import { Comments } from 'src/comments/comment.model';
import { User } from 'src/users/user.model';

export class InsertActivityDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsNumber()
  duration?: number;

  @IsNumber()
  @MinLength(1)
  calories: number;

  @IsString()
  user: string;

  @IsString()
  type: string;
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
  likes?: User[];

  @IsArray()
  comments?: Comments[];

  @IsString()
  newCommentId?: string;

  @IsString()
  user: string;
}
