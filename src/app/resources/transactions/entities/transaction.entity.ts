import { User } from '../../../resources/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Exclude, Type } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

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

  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => User, user => user.transactions)
  user: User;
}
