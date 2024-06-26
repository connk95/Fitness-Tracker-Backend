import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FoodSchema } from './food.model';
import { FoodsController } from './food.controller';
import { FoodsService } from './food.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Foods', schema: FoodSchema }]),
    forwardRef(() => UsersModule),
  ],
  controllers: [FoodsController],
  providers: [FoodsService],
  exports: [FoodsService],
})
export class FoodsModule {}
