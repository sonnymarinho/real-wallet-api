import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document;

@Schema({ _id: false })
export class User {
  constructor(props?: Partial<User>) {
    Object.assign(this, props);
  }

  @Expose({ name: 'id' })
  @Prop({ default: () => uuidv4() })
  _id: string;

  @Expose({ name: 'id' })
  _getId = () => this._id;

  @Prop({ type: 'string' })
  id: string = this._getId();

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  @Exclude({ toPlainOnly: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
