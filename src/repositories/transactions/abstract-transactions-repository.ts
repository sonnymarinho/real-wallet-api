import { CreateTransactionDto } from '@root/resources/transactions/dto/create-transaction.dto';
import { UpdateTransactionDto } from '@root/resources/transactions/dto/update-transaction.dto';
import { Transaction } from '@resources/transactions/entities/transaction.entity';
import { IBaseRepository } from '../interface/base-repository';

export abstract class AbstractTransactionsRepository
  implements IBaseRepository<Transaction>
{
  abstract create(dto: CreateTransactionDto): Promise<Transaction>;
  abstract findAll(): Promise<Transaction[]>;
  abstract findOne(id: Transaction['id']): Promise<Transaction>;
  abstract update(
    id: Transaction['id'],
    dto: UpdateTransactionDto,
  ): Promise<Transaction>;
  abstract remove(id: Transaction['id']): Promise<void>;
}
