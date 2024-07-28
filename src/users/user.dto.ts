import { IsString, MinLength, MaxLength, IsArray } from 'class-validator';
import { Workouts } from 'src/workouts/workout.model';
import { Foods } from 'src/foods/food.model';
import { Comments } from 'src/comments/comment.model';
import { User } from './user.model';

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

  @IsArray()
  likes?: [];
}

export class UpdateUserDto {
  @IsString()
  @MinLength(6)
  @MaxLength(18)
  password?: string;

  @IsString()
  email?: string;

  @IsArray()
  likes?: [];

  @IsArray()
  friends?: User[];

  @IsArray()
  workouts?: Workouts;

  @IsArray()
  foods?: Foods[];

  @IsArray()
  comments?: Comments[];

  @IsString()
  newCommentId?: string;
}
