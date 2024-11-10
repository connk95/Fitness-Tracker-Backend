import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Activity } from './activity.model';
import { InsertActivityDto } from './activity.dto';
import { UsersService } from 'src/users/users.service';
import { Comments } from 'src/comments/comment.model';
import { User } from 'src/users/user.model';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel('Activities') private readonly activityModel: Model<Activity>,
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

  async getSingleActivity(activityId: string): Promise<Activity> {
    return await this.findActivity(activityId);
  }

  async getPaginatedActivities(
    type: 'all' | 'workout' | 'food',
    page: number = 1,
    limit: number = 12,
  ): Promise<{
    total: number;
    page: number;
    pages: number;
    activities: Activity[];
  }> {
    const filter: any = {};

    if (type !== 'all') {
      filter.type = type;
    }

    const skip = (page - 1) * limit;
    const activities = await this.activityModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('user')
      .exec();

    const total = await this.activityModel.countDocuments(filter);

    return {
      total,
      page,
      pages: Math.ceil(total / limit),
      activities,
    };
  }

  async addCommentToActivity(
    activityId: string,
    comment: Comments,
  ): Promise<Activity> {
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

  async addLikeToActivity(activityId: string, user: User): Promise<Activity> {
    const updatedActivity = await this.activityModel.findByIdAndUpdate(
      activityId,
      { $addToSet: { likes: user } },
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

  private async findActivity(id: string): Promise<Activity> {
    let activity;
    try {
      activity = (await this.activityModel.findById(id)).populate([
        {
          path: 'comments',
          populate: { path: 'user' },
        },
        'user',
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
