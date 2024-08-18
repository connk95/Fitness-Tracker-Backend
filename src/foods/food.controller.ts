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
import { InsertCommentDto } from 'src/comments/comment.dto';
import { CommentsService } from 'src/comments/comment.service';
import { User } from 'src/users/user.model';

@Controller('foods')
export class FoodsController {
  constructor(
    private readonly foodService: FoodsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  public async addFood(@Body() body: InsertFoodDto): Promise<string> {
    return await this.foodService.insertFood(body);
  }

  // @Patch(':id')
  // public async updateFood(@Body() body: UpdateFoodDto): Promise<Foods> {
  //   return await this.foodService.updateFood(body);
  // }

  @Patch(':id/comment')
  public async addComment(@Body() body: InsertCommentDto): Promise<string> {
    return await this.commentsService.insertComment(body);
  }

  @Patch(':id/like')
  public async addLike(
    @Param('id') id: string,
    @Body() body: { user: User },
  ): Promise<Foods> {
    const user = body.user;
    return await this.foodService.addLikeToFood(id, user);
  }

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
