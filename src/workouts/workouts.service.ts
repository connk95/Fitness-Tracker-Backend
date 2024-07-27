import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Workouts } from './workout.model';
import { InsertWorkoutDto, UpdateWorkoutDto } from './workout.dto';
import { UsersService } from 'src/users/users.service';
import { Comments } from 'src/comments/comment.model';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectModel('Workouts') private readonly workoutModel: Model<Workouts>,
    private readonly userService: UsersService,
  ) {}

  async insertWorkout({
    type,
    title,
    duration,
    calories,
    user,
  }: InsertWorkoutDto): Promise<string> {
    const newWorkout = new this.workoutModel({
      type,
      title,
      duration,
      calories,
      user,
    });
    const result = await newWorkout.save();
    if (!result) {
      throw new Error('Could not add workout');
    }

    await this.userService.addWorkoutToUser(user, result);

    return result.id as string;
  }

  public async getWorkouts(): Promise<Workouts[]> {
    return await this.workoutModel.find().populate('user').exec();
  }

  async getSingleWorkout(workoutId: string): Promise<Workouts> {
    return await this.findWorkout(workoutId);
  }

  // async updateWorkout(
  //   workoutId: string,
  //   body?: UpdateWorkoutDto,
  // ): Promise<Workouts> {
  //   const updatedWorkout = await this.workoutModel.findByIdAndUpdate(
  //     workoutId,
  //     body,
  //     {
  //       new: true,
  //     },
  //   );

  //   if (!updatedWorkout) {
  //     throw new NotFoundException('Workout not found');
  //   }

  //   return updatedWorkout;
  // }

  async addCommentToWorkout(
    workoutId: string,
    comment: Comments,
  ): Promise<Workouts> {
    const updatedWorkout = await this.workoutModel.findByIdAndUpdate(
      workoutId,
      { $push: { comments: comment } },
      { new: true },
    );

    if (!updatedWorkout) {
      throw new NotFoundException('Post not found');
    }

    return updatedWorkout;
  }

  async addLikeToWorkout(workoutId: string, userId: string): Promise<Workouts> {
    const updatedWorkout = await this.workoutModel.findByIdAndUpdate(
      workoutId,
      { $addToSet: { likes: userId } },
      { new: true },
    );

    if (!updatedWorkout) {
      throw new NotFoundException('Activity not found');
    }
    return updatedWorkout;
  }

  async deleteWorkout(workoutId: string) {
    const result = await this.workoutModel.deleteOne({ _id: workoutId }).exec();
    if (result.deletedCount === 0) {
      throw new Error('Could not delete workout');
    }
  }

  private async findWorkout(id: string): Promise<Workouts> {
    let workout;
    try {
      workout = (await this.workoutModel.findById(id)).populate([
        {
          path: 'user',
        },
      ]);
    } catch (error) {
      throw new Error(error.message);
    }
    if (!workout) {
      throw new NotFoundException('Workout not found');
    }
    return workout;
  }
}
