import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Activities } from './activity.model';
import { InsertActivityDto, UpdateActivityDto } from './activity.dto';
import { UsersService } from 'src/users/users.service';
import { Comments } from 'src/comments/comment.model';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel('Activities')
    private readonly activityModel: Model<Activities>,
    private readonly userService: UsersService,
  ) {}

  async insertActivity({
    type,
    title,
    duration,
    calories,
    user,
  }: InsertActivityDto): Promise<string> {
    const newActivity = new this.activityModel({
      type,
      title,
      duration,
      calories,
      user,
    });
    const result = await newActivity.save();
    if (!result) {
      throw new Error('Could not add activity');
    }

    await this.userService.addActivityToUser(user, result);

    return result.id as string;
  }

  public async getActivities(): Promise<Activities[]> {
    return await this.activityModel.find().populate('user').exec();
  }

  async getSingleActivity(activityId: string): Promise<Activities> {
    return await this.findActivity(activityId);
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

  async addCommentToActivity(
    activityId: string,
    comment: Comments,
  ): Promise<Activities> {
    const updatedActivity = await this.activityModel.findByIdAndUpdate(
      activityId,
      { $push: { comments: comment } },
      { new: true },
    );

    if (!updatedActivity) {
      throw new NotFoundException('Activity not found');
    }

    return updatedActivity;
  }

  async deleteActivity(activityId: string) {
    const result = await this.activityModel
      .deleteOne({ _id: activityId })
      .exec();
    if (result.deletedCount === 0) {
      throw new Error('Could not delete activity');
    }
  }

  private async findActivity(id: string): Promise<Activities> {
    let activity;
    try {
      activity = (await this.activityModel.findById(id)).populate([
        {
          path: 'user',
        },
      ]);
    } catch (error) {
      throw new Error(error.message);
    }
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }
    return activity;
  }
}
