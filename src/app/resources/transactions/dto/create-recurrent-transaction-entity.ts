import { User } from '../../users/entities/user.entity';
import { CreateTransactionInput } from './create-transaction.input';

export interface CreateRecurrentRecurrentTransactionEntity
  extends CreateTransactionInput {
  user: User;
}
