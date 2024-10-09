import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodSchema } from './food.model';
import { FoodsController } from './food.controller';
import { FoodsService } from './food.service';
import { UsersModule } from 'src/users/users.module';
import { CommentsModule } from 'src/comments/comment.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Foods', schema: FoodSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => CommentsModule),
  ],
  controllers: [FoodsController],
  providers: [FoodsService],
  exports: [FoodsService],
})
export class FoodsModule {}
