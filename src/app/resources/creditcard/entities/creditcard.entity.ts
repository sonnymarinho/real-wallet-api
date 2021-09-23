import { ObjectType, Field } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../../users/entities/user.entity';

@Entity('credit_cards')
@ObjectType()
export class Creditcard {
  constructor(props: Partial<Creditcard> = {}) {
    const id = uuidv4();
    Object.assign(this, { ...props, id });
  }

  @Field()
  @PrimaryColumn()
  id?: string;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => User, user => user.transactions)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
