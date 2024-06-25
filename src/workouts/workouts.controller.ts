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

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutService: WorkoutsService) {}

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
