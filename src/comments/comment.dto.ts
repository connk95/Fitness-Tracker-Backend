import {
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  IsObject,
} from 'class-validator';
import { User } from 'src/users/user.model';

export class InsertCommentDto {
  @IsString()
  @MinLength(1)
  @MaxLength(220)
  text: string;

  // @IsString()
  // user: string;

  @IsString()
  activityId: string;

  @IsObject()
  user: User;
}

export class UpdateCommentDto {
  @IsString()
  @MinLength(1)
  @MaxLength(220)
  text?: string;

  @IsArray()
  likes?: [];
}
