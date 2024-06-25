import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FoodSchema } from './food.model';
import { FoodsController } from './food.controller';
import { FoodsService } from './food.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Foods', schema: FoodSchema }])],
  controllers: [FoodsController],
  providers: [FoodsService],
  exports: [FoodsService],
})
export class FoodsModule {}
