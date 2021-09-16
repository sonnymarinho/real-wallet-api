import { User } from '../../users/entities/user.entity';

export enum TransactionType {
  income = 'income',
  expense = 'expense',
}

export interface ITransaction {
  id?: string;
  value: number;
  title: string;
  description?: string;
  type: TransactionType;
  date: Date;
  user: User;
  created_at: Date;
  updated_at: Date;
}
