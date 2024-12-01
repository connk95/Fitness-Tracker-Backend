import {
  IsString,
  MinLength,
  IsArray,
  IsNumber,
  Min,
  IsOptional,
  IsObject,
} from 'class-validator';
import { Comments } from 'src/comments/comment.model';
import { User } from 'src/users/user.model';

export class InsertActivityDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  duration?: number | null;

  @IsNumber()
  @Min(0)
  calories: number;

  @IsObject()
  user: User;

  @IsString()
  type: string;
}

export class UpdateActivityDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  duration?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  calories?: number;

  @IsOptional()
  @IsArray()
  likes?: User[];

  @IsOptional()
  @IsArray()
  comments?: Comments[];

  @IsOptional()
  @IsString()
  newCommentId?: string;

  @IsObject()
  user: User;
}
