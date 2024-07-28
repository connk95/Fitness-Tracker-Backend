import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Workouts } from 'src/workouts/workout.model';
import * as mongoose from 'mongoose';
import { Foods } from 'src/foods/food.model';
import { Comments } from 'src/comments/comment.model';

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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Foods' }] })
  foods?: Foods[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workouts' }] })
  workouts?: Workouts[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }] })
  comments?: Comments[];
}

export const UserSchema = SchemaFactory.createForClass(User);
