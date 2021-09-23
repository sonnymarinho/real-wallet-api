import { Expose } from 'class-transformer';
import { Creditcard } from 'src/app/resources/creditcard/entities/creditcard.entity';
import { User } from 'src/app/resources/users/entities/user.entity';
import { RecurrentTransaction } from '../../entities/recurrent-transaction.entity';
import { CreateTransactionInput } from '../input/create-transaction.input';

export class CreateTransactionEntity extends CreateTransactionInput {
  @Expose() user: User;
  @Expose() recurrentTransaction?: RecurrentTransaction;
  @Expose() creditCard?: Creditcard;
}
