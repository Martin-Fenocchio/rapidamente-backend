import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  history: string;

  @Prop({ required: true })
  points: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
