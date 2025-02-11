import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';
import { InsertUserDto, UpdateUserDto } from './user.dto';
import { Activity } from 'src/activity/activity.model';
import { Comments } from 'src/comments/comment.model';

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
        .populate(['activities', 'comments']);
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

  async addActivityToUser(user: User, activity: Activity): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      user._id,
      { $addToSet: { activities: activity } },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async addCommentToUser(user: User, comment: Comments): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      user,
      { $push: { comments: comment } },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async addFriendToUser(userId: string, friend: User): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friend } },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('Activity not found');
    }

    return updatedUser;
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.deletedCount === 0) {
      throw new Error('Could not delete user');
    }
  }

  async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel
        .findById(id)
        .populate(['activities', 'comments', 'friends']);
    } catch (error) {
      throw new Error(error.message);
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
