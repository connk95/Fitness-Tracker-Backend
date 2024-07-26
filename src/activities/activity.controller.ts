import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ActivitiesService } from './activity.service';
import { InsertActivityDto, UpdateActivityDto } from './activity.dto';
import { Activities } from './activity.model';
import { InsertCommentDto } from 'src/comments/comment.dto';
import { CommentsService } from 'src/comments/comment.service';

@Controller('activities')
export class ActivitiesController {
  constructor(
    private readonly activityService: ActivitiesService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  public async addActivity(@Body() body: InsertActivityDto): Promise<string> {
    return await this.activityService.insertActivity(body);
  }

  //   @Patch(':id')
  //   public async updateWorkout(
  //     @Body() body: UpdateWorkoutDto,
  //   ): Promise<Workouts> {
  //     return await this.workoutService.updateWorkout(body);
  //   }

  @Patch(':id')
  public async addComment(@Body() body: InsertCommentDto): Promise<string> {
    return await this.commentsService.insertComment(body);
  }

  @Get()
  async getAllActivities(): Promise<Activities[]> {
    return await this.activityService.getActivities();
  }

  @Get(':id')
  async getActivity(@Param('id') id: string): Promise<Activities> {
    return await this.activityService.getSingleActivity(id);
  }

  @Delete(':id')
  async removeActivity(@Param(':id') activityId: string): Promise<Activities> {
    await this.activityService.deleteActivity(activityId);
    return null;
  }
}
