import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Comments } from './comment.model';
import { InsertCommentDto, UpdateCommentDto } from './comment.dto';
import { UsersService } from 'src/users/users.service';
import { WorkoutsService } from 'src/workouts/workouts.service';
import { FoodsService } from 'src/foods/food.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comments') private readonly commentModel: Model<Comments>,
    private readonly userService: UsersService,
    private readonly foodsService: FoodsService,
    private readonly workoutsService: WorkoutsService,
  ) {}

  async insertComment({
    text,
    activityId,
    user,
  }: InsertCommentDto): Promise<string> {
    const newComment = new this.commentModel({
      text,
      activityId,
      user,
    });
    const result = await newComment.save();
    if (!result) {
      throw new NotFoundException('Could not add comment');
    }

    await this.userService.addCommentToUser(user, result);
    await this.foodsService.addCommentToFood(activityId, result);
    await this.workoutsService.addCommentToWorkout(activityId, result);

    return result._id as string;
  }

  async getComments() {
    return await this.commentModel.find().populate('user').exec();
  }

  async getSingleComment(commentId: string) {
    return await this.findComment(commentId);
  }

  async updateComment(
    commentId: string,
    body: UpdateCommentDto,
  ): Promise<Comments> {
    const updatedComment = await this.commentModel.findByIdAndUpdate(
      commentId,
      body,
    );
    if (!updatedComment) {
      throw new NotFoundException('Comment not found');
    }
    return updatedComment;
  }

  async deleteComment(commentId: string) {
    const result = await this.commentModel.deleteOne({ _id: commentId }).exec();
    if (result.deletedCount === 0) {
      throw new Error('Could not delete comment');
    }
  }

  private async findComment(id: string): Promise<Comments> {
    let comment;
    try {
      comment = await this.commentModel.findById(id).exec();
    } catch (error) {
      throw new Error(error.message);
    }
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }
}
