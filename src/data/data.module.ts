import { Module, forwardRef } from '@nestjs/common';
import { DataService } from './data.services';
import { DataController } from './data.controller';
import { FoodsModule } from 'src/foods/food.module';
import { WorkoutsModule } from 'src/workouts/workouts.module';

@Module({
  imports: [forwardRef(() => FoodsModule), forwardRef(() => WorkoutsModule)],
  controllers: [DataController],
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}
