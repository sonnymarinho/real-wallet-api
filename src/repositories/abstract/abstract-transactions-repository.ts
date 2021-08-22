import { Transaction } from '@prisma/client';
import { IBaseRepository } from '../interface/base-repository';
import { TransactionEntity } from '@root/resources/transactions/entities/transaction.entity';
import { CreateTransactionDto } from '@root/resources/transactions/dto/create-transaction.dto';
import { UpdateTransactionDto } from '@root/resources/transactions/dto/update-transaction.dto';
import { plainToClass } from 'class-transformer';

export abstract class AbstractTransactionsRepository
  implements IBaseRepository<TransactionEntity>
{
  private parseToEntity(transaction: Transaction): TransactionEntity {
    const { value, ...data } = transaction;
    const parsed = plainToClass(TransactionEntity, data);

    return { ...parsed, value: value.toNumber() };
  }

  protected toEntity(transaction: Transaction) {
    return this.parseToEntity(transaction);
  }

  protected toEntityArray(transactions: Transaction[]) {
    return transactions.map((transaction) => this.parseToEntity(transaction));
  }

  abstract create(dto: CreateTransactionDto): Promise<TransactionEntity>;
  abstract findAllByUserId(
    id: Transaction['userId'],
  ): Promise<TransactionEntity[]>;
  abstract findOne(id: Transaction['id']): Promise<TransactionEntity>;
  abstract update(
    id: Transaction['id'],
    dto: UpdateTransactionDto,
  ): Promise<TransactionEntity>;
  abstract remove(id: Transaction['id']): Promise<void>;
}
