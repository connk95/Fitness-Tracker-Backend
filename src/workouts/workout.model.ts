import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/user.model';

@Schema({ timestamps: true })
export class Workouts extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  duration: number;

  @Prop({ required: false })
  calories: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  createdAt?: Date;

  updatedAt?: Date;
}

export const PostSchema = SchemaFactory.createForClass(Workouts);
