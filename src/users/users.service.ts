import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';
import { InsertUserDto, UpdateUserDto } from './user.dto';
import { Workouts } from 'src/workouts/workout.model';
import { Foods } from 'src/foods/food.model';
import { Comments } from 'src/comments/comment.model';
import { Activities } from 'src/activities/activity.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser({
    username,
    password,
    email,
  }: InsertUserDto): Promise<string> {
    const newUser = new this.userModel({
      username,
      password,
      email,
    });

    const result = await newUser.save();

    if (!result) {
      throw new Error('Could not create user');
    }

    return result.id as string;
  }

  public async getUsers(): Promise<User[]> {
    return await this.userModel.find().populate('username').exec();
  }

  async getSingleUser(userId: string): Promise<User> {
    return await this.findUser(userId);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await this.userModel
        .findOne({ username })
        .populate(['workouts', 'foods', 'activities', 'comments']);
      if (user && user.username == username) {
        return user;
      } else {
        throw new Error('Incorrect username or password');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(userId: string, body: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, body, {
      new: true,
    });

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    await updatedUser.save();

    return updatedUser;
  }

  async addWorkoutToUser(userId: string, workout: Workouts): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { workouts: workout } },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async addFoodToUser(userId: string, food: Foods): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { foods: food } },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async addActivityToUser(userId: string, activity: Activities): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { activities: activity } },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async addCommentToUser(userId: string, comment: Comments): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { comments: comment } },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.deletedCount === 0) {
      throw new Error('Could not delete user');
    }
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel
        .findById(id)
        .populate(['workouts', 'foods', 'activities', 'comments']);
    } catch (error) {
      throw new Error(error.message);
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
