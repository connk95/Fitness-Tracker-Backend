import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ActivitySchema } from './activity.model';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { UsersModule } from 'src/users/users.module';
import { CommentsModule } from 'src/comments/comment.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Activities', schema: ActivitySchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => CommentsModule),
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {}
