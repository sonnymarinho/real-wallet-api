import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@root/resources/users/entities/user.entity';
import { Exclude, Expose } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type TransactionDocument = Transaction & Document;

@Schema({ _id: false })
export class Transaction {
  constructor(props?: Partial<Transaction>) {
    Object.assign(this, props);
  }

  // @Expose({ name: 'id' })
  @Prop({ default: () => uuidv4() })
  _id: string;

  @Expose({ name: 'id' })
  _getId = () => this._id;

  @Prop({ type: 'string' })
  id: string = this._getId();

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: { ref: 'User', alias: 'id' } })
  user: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
