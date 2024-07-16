import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentsController } from './comment.controller';
import { CommentsService } from './comment.service';
import { CommentSchema } from './comment.model';
import { UsersModule } from 'src/users/users.module';
import { WorkoutsModule } from 'src/workouts/workouts.module';
import { FoodsModule } from 'src/foods/food.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comments', schema: CommentSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => FoodsModule),
    forwardRef(() => WorkoutsModule),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
