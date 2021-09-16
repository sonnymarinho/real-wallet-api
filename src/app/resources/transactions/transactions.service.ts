import { Inject, Injectable } from '@nestjs/common';
import { PROVIDER } from '../../config/providers-name';
import { TransactionsRepository } from 'src/app/repositories/implementation/transactions/transactions.repository';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { Transaction } from './entities/transaction.entity';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { User } from '../users/entities/user.entity';
import { RecurrentTransactionsRepository } from 'src/app/repositories/implementation/transactions/recurrent-transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(PROVIDER.TRANSACTIONS.REPOSITORY)
    private readonly transactionRepository: TransactionsRepository,
    @Inject(PROVIDER.RECURRENT_TRANSACTIONS.REPOSITORY)
    private readonly recurrentTransactionRepository: RecurrentTransactionsRepository,
  ) {}

  async create(dto: CreateTransactionInput, user: User): Promise<Transaction> {
    const data = { ...dto, user };
    let recurrentTransaction;

    if (dto.isRecurrent) {
      recurrentTransaction = await this.recurrentTransactionRepository.create(
        data,
      );
    }

    const transaction = await this.transactionRepository.create({
      ...data,
      recurrentTransaction,
    });

    return transaction;
  }

  findAllByUser(user: Transaction['user']): Promise<Transaction[]> {
    return this.transactionRepository.findAllByUser(user);
  }

  findTransactionsInMonth(user: User, year: number, month: number) {
    return this.transactionRepository.findTransactionsInMonth(
      user,
      year,
      month,
    );
  }

  findOne(id: Transaction['id']) {
    return `This action returns a #${id} transaction`;
  }

  update(id: Transaction['id'], updateTransactionDto: UpdateTransactionInput) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: Transaction['id']) {
    return `This action removes a #${id} transaction`;
  }
}
