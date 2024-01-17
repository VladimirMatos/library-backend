import { Status } from '@Common/enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { User } from '@User/schema';

@Schema({
  timestamps: true,
})
export class Tasks {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: Status })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Tasks);
