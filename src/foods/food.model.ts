// import * as mongoose from 'mongoose';
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';
// import { User } from 'src/users/user.model';
// import { Comments } from 'src/comments/comment.model';

// @Schema({ timestamps: true })
// export class Foods extends Document {
//   @Prop({ required: true })
//   type: string;

//   @Prop({ required: true })
//   title: string;

//   @Prop({ required: false })
//   calories: number;

//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
//   user: User;

//   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }] })
//   comments?: Comments[];

//   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Likes' }] })
//   likes?: User[];

//   createdAt?: Date;

//   updatedAt?: Date;
// }

// export const FoodSchema = SchemaFactory.createForClass(Foods);
