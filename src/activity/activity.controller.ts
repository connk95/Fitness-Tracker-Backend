import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ActivityService } from './activity.service';
import { InsertActivityDto, UpdateActivityDto } from './activity.dto';
import { Activity } from './activity.model';
import { InsertCommentDto } from 'src/comments/comment.dto';
import { CommentsService } from 'src/comments/comment.service';
import { User } from 'src/users/user.model';

@Controller('activities')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  public async addActivity(@Body() body: InsertActivityDto): Promise<string> {
    console.log('test');
    return await this.activityService.insertActivity(body);
  }

  //   @Patch(':id')
  //   public async updateWorkout(
  //     @Body() body: UpdateWorkoutDto,
  //   ): Promise<Workouts> {
  //     return await this.workoutService.updateWorkout(body);
  //   }

  @Patch(':id/comment')
  public async addComment(@Body() body: InsertCommentDto): Promise<string> {
    return await this.commentsService.insertComment(body);
  }

  @Patch(':id/like')
  public async addLike(
    @Param('id') id: string,
    @Body() body: { user: User },
  ): Promise<Activity> {
    const user = body.user;
    return await this.activityService.addLikeToActivity(id, user);
  }

  @Get()
  async getAllActivities(): Promise<Activity[]> {
    return await this.activityService.getActivities();
  }

  @Get(':id')
  async getActivity(@Param('id') id: string): Promise<Activity> {
    return await this.activityService.getSingleActivity(id);
  }

  @Delete(':id')
  async removeActivity(@Param(':id') activityId: string): Promise<Activity> {
    await this.activityService.deleteActivity(activityId);
    return null;
  }
}
