import { IsString, MinLength, MaxLength, IsArray } from 'class-validator';
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
  @IsString()
  @MinLength(6)
  @MaxLength(18)
  password?: string;

  @IsString()
  email?: string;

  @IsArray()
  likes?: User[];

  @IsArray()
  friends?: User[];

  @IsArray()
  activities?: Activity[];

  @IsArray()
  comments?: Comments[];

  @IsString()
  newCommentId?: string;
}
