import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WorkoutSchema } from './workout.model';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Workouts', schema: WorkoutSchema }]),
    forwardRef(() => UsersModule),
    // forwardRef(() => )
  ],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  exports: [WorkoutsService],
})
export class WorkoutsModule {}
