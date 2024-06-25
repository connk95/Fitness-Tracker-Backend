import { IsString, MinLength, IsArray, IsNumber } from 'class-validator';

export class InsertFoodDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsNumber()
  @MinLength(1)
  calories: number;

  @IsString()
  user: string;
}

export class UpdateFoodDto {
  @IsString()
  @MinLength(1)
  title?: string;

  @IsNumber()
  @MinLength(1)
  calories?: number;

  @IsArray()
  likes?: [];

  @IsString()
  user: string;
}
