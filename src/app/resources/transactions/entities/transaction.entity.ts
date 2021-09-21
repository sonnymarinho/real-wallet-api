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
import { ITransaction, TransactionType } from '../types/transaction';
import { RecurrentTransaction } from './recurrent-transaction.entity';

@ObjectType()
@Entity('transactions')
export class Transaction implements ITransaction {
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column()
  type: TransactionType;

  @Field({ defaultValue: false })
  @Column({ default: false })
  @Expose({ name: 'is_confirmed' })
  isConfirmed: boolean;

  @Field()
  @Column({ default: new Date() })
  date: Date;

  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => User, user => user.transactions)
  user: User;

  @Field(() => RecurrentTransaction)
  @ManyToOne(
    () => RecurrentTransaction,
    recurrentTransaction => recurrentTransaction.transactions,
  )
  recurrentTransaction: RecurrentTransaction;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
