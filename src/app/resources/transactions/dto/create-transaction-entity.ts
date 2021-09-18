import { Expose } from 'class-transformer';
import { User } from '../../users/entities/user.entity';
import { RecurrentTransaction } from '../entities/recurrent-transaction.entity';
import { CreateTransactionInput } from './create-transaction.input';

export class CreateTransactionEntity extends CreateTransactionInput {
  @Expose() user: User;
  @Expose() recurrentTransaction?: RecurrentTransaction;
}
