import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/user.model';
import { Comments } from 'src/comments/comment.model';

@Schema({ timestamps: true })
export class Activity extends Document {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  duration: number;

  @Prop({ required: false })
  calories: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }] })
  comments?: Comments[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  likes?: User[];

  createdAt?: Date;

  updatedAt?: Date;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
