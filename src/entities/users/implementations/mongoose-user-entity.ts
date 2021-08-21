import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../user-interface';

export type UserDocument = MongooseUserEntity & Document;

@Schema({ _id: false })
export class MongooseUserEntity implements IUser {
  constructor(props?: Partial<MongooseUserEntity>) {
    Object.assign(this, props);
  }

  @Prop({ default: () => uuidv4() })
  _id: string;

  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(MongooseUserEntity);
