import { User } from '../../../users/entities/user.entity';
import { CreateTransactionInput } from '../input/create-transaction.input';

export interface CreateRecurrentRecurrentTransactionEntity
  extends CreateTransactionInput {
  user: User;
}
