import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';

import { ActivityService } from './activity.service';
import { InsertActivityDto, UpdateActivityDto } from './activity.dto';
import { Activity } from './activity.model';
import { InsertCommentDto } from 'src/comments/comment.dto';
import { CommentsService } from 'src/comments/comment.service';

@Controller('activities')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  public async addActivity(@Body() body: InsertActivityDto): Promise<string> {
    return await this.activityService.insertActivity(body);
  }

  @Patch(':id/comment')
  public async addComment(@Body() body: InsertCommentDto): Promise<string> {
    console.log('test insertComment');
    return await this.commentsService.insertComment(body);
  }

  @Patch(':id/like')
  public async addLike(
    @Param('id') id: string,
    @Body() body: { userId: string },
  ): Promise<Activity> {
    return await this.activityService.addLikeToActivity(id, body.userId);
  }

  @Get(':id')
  async getActivity(@Param('id') id: string): Promise<Activity> {
    return await this.activityService.getSingleActivity(id);
  }

  @Get()
  async getPaginatedActivities(
    @Query('type') type: 'all' | 'workout' | 'food' = 'all',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 12,
  ) {
    return this.activityService.getPaginatedActivities(type, page, limit);
  }

  @Delete(':id')
  async removeActivity(@Param(':id') activityId: string): Promise<Activity> {
    await this.activityService.deleteActivity(activityId);
    return null;
  }
}
