import {
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  IsNumber,
} from 'class-validator';

export class InsertWorkoutDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsNumber()
  @MinLength(1)
  duration: number;

  @IsNumber()
  @MinLength(1)
  calories: number;

  @IsString()
  user: string;
}

export class UpdateWorkoutDto {
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

  @IsString()
  user: string;
}
