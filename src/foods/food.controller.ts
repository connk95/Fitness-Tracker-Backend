import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { FoodsService } from './food.service';
import { InsertFoodDto, UpdateFoodDto } from './food.dto';
import { Foods } from './food.model';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodService: FoodsService) {}

  @Post()
  public async addFood(@Body() body: InsertFoodDto): Promise<string> {
    return await this.foodService.insertFood(body);
  }

  //   @Patch(':id')
  //   public async updateFood(@Body() body: UpdateFoodDto): Promise<Foods> {
  //     return await this.foodService.updateFood(body);
  //   }

  @Get()
  async getAllFoods(): Promise<Foods[]> {
    return await this.foodService.getFoods();
  }

  @Get(':id')
  async getFood(@Param('id') id: string): Promise<Foods> {
    return await this.foodService.getSingleFood(id);
  }

  @Delete(':id')
  async removeFood(@Param(':id') foodId: string): Promise<Foods> {
    await this.foodService.deleteFood(foodId);
    return null;
  }
}
