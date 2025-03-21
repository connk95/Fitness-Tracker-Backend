// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Foods } from './food.model';
// import { InsertFoodDto, UpdateFoodDto } from './food.dto';
// import { UsersService } from 'src/users/users.service';
// import { Comments } from 'src/comments/comment.model';
// import { User } from 'src/users/user.model';

// @Injectable()
// export class FoodsService {
//   constructor(
//     @InjectModel('Foods') private readonly foodModel: Model<Foods>,
//     private readonly userService: UsersService,
//   ) {}

//   async insertFood({
//     type,
//     title,
//     calories,
//     user,
//   }: InsertFoodDto): Promise<string> {
//     const newFood = new this.foodModel({
//       type,
//       title,
//       calories,
//       user,
//     });
//     const result = await newFood.save();
//     if (!result) {
//       throw new Error('Could not add food');
//     }
//     await this.userService.addFoodToUser(user, result);
//     return result.id as string;
//   }

//   public async getFoods(): Promise<Foods[]> {
//     return await this.foodModel.find().populate('user').exec();
//   }

//   async getSingleFood(foodId: string): Promise<Foods> {
//     return await this.findFood(foodId);
//   }

//   async updateFood(foodId: string, body?: UpdateFoodDto): Promise<Foods> {
//     const updatedFood = await this.foodModel.findByIdAndUpdate(foodId, body, {
//       new: true,
//     });

//     if (!updatedFood) {
//       throw new NotFoundException('Food not found');
//     }
//     return updatedFood;
//   }

//   async addCommentToFood(foodId: string, comment: Comments): Promise<Foods> {
//     const updatedFood = await this.foodModel.findByIdAndUpdate(
//       foodId,
//       { $push: { comments: comment } },
//       { new: true },
//     );

//     if (!updatedFood) {
//       throw new NotFoundException('Activity not found');
//     }
//     return updatedFood;
//   }

//   async addLikeToFood(foodId: string, user: User): Promise<Foods> {
//     const updatedFood = await this.foodModel
//       .findByIdAndUpdate(foodId, { $addToSet: { likes: user } }, { new: true })
//       .populate('user');

//     if (!updatedFood) {
//       throw new NotFoundException('Activity not found');
//     }
//     return updatedFood;
//   }

//   async deleteFood(foodId: string) {
//     const result = await this.foodModel.deleteOne({ _id: foodId }).exec();
//     if (result.deletedCount === 0) {
//       throw new Error('Could not deleteb food');
//     }
//   }

//   private async findFood(id: string): Promise<Foods> {
//     let food;
//     try {
//       food = (await this.foodModel.findById(id)).populate([
//         {
//           path: 'comments',
//           populate: 'user',
//         },
//         'user',
//       ]);
//     } catch (error) {
//       throw new Error(error.message);
//     }
//     if (!food) {
//       throw new NotFoundException('Food not found');
//     }
//     return food;
//   }
// }
