import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { WorkoutsService } from './workouts.service';
import { InsertWorkoutDto, UpdateWorkoutDto } from './workout.dto';
import { Workouts } from './workout.model';
import { InsertCommentDto } from 'src/comments/comment.dto';
import { CommentsService } from 'src/comments/comment.service';
import { User } from 'src/users/user.model';

@Controller('workouts')
export class WorkoutsController {
  constructor(
    private readonly workoutService: WorkoutsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  public async addWorkout(@Body() body: InsertWorkoutDto): Promise<string> {
    return await this.workoutService.insertWorkout(body);
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

  @Patch(':id/like')
  public async addLike(
    @Param('id') id: string,
    @Body() body: { user: User },
  ): Promise<Workouts> {
    const user = body.user;
    return await this.workoutService.addLikeToWorkout(id, user);
  }

  @Get()
  async getAllWorkouts(): Promise<Workouts[]> {
    return await this.workoutService.getWorkouts();
  }

  @Get(':id')
  async getWorkout(@Param('id') id: string): Promise<Workouts> {
    return await this.workoutService.getSingleWorkout(id);
  }

  @Delete(':id')
  async removeWorkout(@Param(':id') workoutId: string): Promise<Workouts> {
    await this.workoutService.deleteWorkout(workoutId);
    return null;
  }
}
