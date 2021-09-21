import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { RecurrentTransaction } from '../../transactions/entities/recurrent-transaction.entity';

@Expose()
@ObjectType()
@Entity({ name: 'users' })
export class User {
  constructor(props: Partial<User> = {}) {
    const id = uuidv4();
    Object.assign(this, { ...props, id });
  }

  @PrimaryColumn()
  @Field({ description: 'User id based on uuid', nullable: true })
  id?: string;

  @Column('text')
  @Field()
  name: string;

  @Column('text')
  @Field()
  email: string;

  @Column('text')
  @Exclude({ toPlainOnly: true })
  @Field()
  password: string;

  @Field(() => [Transaction])
  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions: Transaction[];

  @Field(() => [RecurrentTransaction])
  @OneToMany(
    () => RecurrentTransaction,
    recurrentTransaction => recurrentTransaction.user,
  )
  recurrentTransactions;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
