import { User } from '../../../resources/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Exclude, Type } from 'class-transformer';

@Entity('transactions')
export class Transaction {
  constructor(props: Partial<Transaction> = {}) {
    const id = uuidv4();
    Object.assign(this, { ...props, id });
  }

  @PrimaryColumn()
  id?: string;

  @Type(() => Number)
  @Column({ type: 'decimal' })
  value: number;

  @Column()
  title: string;

  @Column()
  description?: string;

  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}
