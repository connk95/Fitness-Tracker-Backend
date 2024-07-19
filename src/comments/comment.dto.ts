import { IsString, MinLength, MaxLength, IsArray } from 'class-validator';

export class InsertCommentDto {
  @IsString()
  @MinLength(1)
  @MaxLength(220)
  text: string;

  @IsString()
  user: string;

  @IsString()
  activityId: string;

  @IsString()
  type: string;
}

export class UpdateCommentDto {
  @IsString()
  @MinLength(1)
  @MaxLength(220)
  text?: string;

  @IsArray()
  likes?: [];
}
