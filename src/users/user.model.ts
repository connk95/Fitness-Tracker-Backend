import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Comments } from 'src/comments/comment.model';
import { Activity } from 'src/activity/activity.model';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  likes?: [];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  friends?: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activities' }] })
  activities?: Activity[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }] })
  comments?: Comments[];
}

export const UserSchema = SchemaFactory.createForClass(User);
