import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
// import { WorkoutsModule } from './workouts/workouts.module';
// import { FoodsModule } from './foods/food.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comment.module';
// import { DataModule } from './services/data.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AuthModule,
    UsersModule,
    ActivityModule,
    // WorkoutsModule,
    // FoodsModule,
    CommentsModule,
    // DataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
