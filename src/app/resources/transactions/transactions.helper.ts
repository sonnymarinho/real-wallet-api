import { RecurrentTransaction } from './entities/recurrent-transaction.entity';
import { Transaction } from './entities/transaction.entity';

export class TransactionsHelper {
  recurrents: RecurrentTransaction[];
  transactions: Transaction[];
  result;

  protected filterRecurrentTransactionsNotCreatedYet(
    recurrentTransactions: RecurrentTransaction[],
    transactions: Transaction[],
  ): RecurrentTransaction[] {
    const result = recurrentTransactions.filter(
      ({ id }) =>
        !transactions
          .filter(t => t?.recurrentTransaction?.id)
          .map(t => t?.recurrentTransaction?.id)
          .includes(id),
    );

    return result;
  }
}
