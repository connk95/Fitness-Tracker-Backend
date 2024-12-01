import {
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Comments } from 'src/comments/comment.model';
import { User } from './user.model';
import { Activity } from 'src/activity/activity.model';

export class InsertUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(18)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(18)
  password: string;

  @IsString()
  email: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(18)
  password?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsArray()
  likes?: Activity[];

  @IsOptional()
  @IsArray()
  friends?: User[];

  @IsOptional()
  @IsArray()
  activities?: Activity[];

  @IsOptional()
  @IsArray()
  comments?: Comments[];

  @IsOptional()
  @IsString()
  newCommentId?: string;
}
