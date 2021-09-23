import { ObjectType, Field } from '@nestjs/graphql';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Creditcard } from '../../creditcard/entities/creditcard.entity';
import { User } from '../../users/entities/user.entity';
import { ITransaction, TransactionType } from '../types/transaction';
import { Transaction } from './transaction.entity';

@ObjectType()
@Entity('recurrent_transactions')
export class RecurrentTransaction implements ITransaction {
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

  @Field()
  @Column({ default: new Date() })
  date: Date;

  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => User, user => user.recurrentTransactions)
  user: User;

  @Field(() => Creditcard)
  @ManyToOne(() => Creditcard, creditCard => creditCard.user)
  creditCard: Creditcard;

  @Field({ defaultValue: false })
  @Column({ default: false })
  isPermanent?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  installments?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Field(type => [Transaction])
  @OneToMany(() => Transaction, transaction => transaction.recurrentTransaction)
  transactions: Transaction[];
}
