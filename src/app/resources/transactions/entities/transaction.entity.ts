import { ObjectType, Field } from '@nestjs/graphql';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../users/entities/user.entity';

export enum TransactionType {
  income = 'income',
  expense = 'expense',
}

@ObjectType()
@Entity('transactions')
export class Transaction {
  constructor(props: Partial<Transaction> = {}) {
    const id = uuidv4();
    Object.assign(this, { ...props, id });
  }

  @Field()
  @PrimaryColumn()
  id?: string;

  @Field()
  @Type(() => Number)
  @Column({ type: 'decimal' })
  value: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description?: string;

  @Field()
  @Column()
  type: TransactionType;

  @Field()
  @Column({ default: false })
  @Expose({ name: 'is_periodically' })
  isPeriodically: false;

  @Field()
  @Column({ default: false })
  @Expose({ name: 'is_confirmed' })
  isConfirmed: false;

  @Field()
  @Column()
  date: Date;

  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => User, user => user.transactions)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
