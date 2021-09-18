import { Inject, Injectable } from '@nestjs/common';
import { PROVIDER } from '../../config/providers-name';
import { TransactionsRepository } from 'src/app/repositories/implementation/typeorm/transactions/transactions.repository';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { Transaction } from './entities/transaction.entity';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { User } from '../users/entities/user.entity';
import { RecurrentTransactionsRepository } from 'src/app/repositories/implementation/typeorm/transactions/recurrent-transactions.repository';
import { TransactionsHelper } from './transactions.helper';
import { RecurrentTransaction } from './entities/recurrent-transaction.entity';
import { CreateTransactionEntity } from './dto/create-transaction-entity';
import { plainToClass } from 'class-transformer';
import { addMonths } from 'date-fns';

@Injectable()
export class TransactionsService extends TransactionsHelper {
  constructor(
    @Inject(PROVIDER.TRANSACTIONS.REPOSITORY)
    private readonly transactionRepository: TransactionsRepository,
    @Inject(PROVIDER.RECURRENT_TRANSACTIONS.REPOSITORY)
    private readonly recurrentTransactionsRepository: RecurrentTransactionsRepository,
  ) {
    super();
  }

  async create(dto: CreateTransactionInput, user: User): Promise<Transaction> {
    const { isRecurrent, recurrenceTimes } = dto;

    const data = { ...dto, user };

    if (!recurrenceTimes) {
      const recurrentTransaction = isRecurrent
        ? await this.recurrentTransactionsRepository.create(data)
        : undefined;

      const transaction = await this.transactionRepository.create({
        ...data,
        recurrentTransaction,
      });

      return transaction;
    }

    if (recurrenceTimes) {
      const createdTransactions = await Promise.all(
        [...new Array(recurrenceTimes)].map((value, index) => {
          const { date } = data;
          const newValidMonth = addMonths(date, index);

          const ajustedData = { ...data, date: newValidMonth };

          return this.transactionRepository.create(ajustedData);
        }),
      );

      return createdTransactions[0];
    }
  }

  findAllByUser(user: Transaction['user']): Promise<Transaction[]> {
    return this.transactionRepository.findAllByUser(user);
  }

  async findTransactionsInMonth(user: User, year: number, month: number) {
    const recurrentTransactions =
      await this.recurrentTransactionsRepository.findRecurrentTransactionsAfterThisMonth(
        user,
        year,
        month,
      );

    const transactions =
      await this.transactionRepository.findTransactionsInMonth(
        user,
        year,
        month,
      );

    const transactionsNotExistingOnThisMonth =
      this.filterRecurrentTransactionsNotCreatedYet(
        recurrentTransactions,
        transactions,
      );

    const pendingTransactionsWithCurrentMonthDate =
      transactionsNotExistingOnThisMonth.map(({ date, ...data }) => {
        const currentMonthDate = new Date(date.setMonth(month - 1));

        return { ...data, date: currentMonthDate };
      });

    const thereIsTransactionsPending =
      pendingTransactionsWithCurrentMonthDate.length;

    const recurrentToTransactions = thereIsTransactionsPending
      ? await this.createAllRecurrentTransactions(
          pendingTransactionsWithCurrentMonthDate,
          user,
        )
      : [];

    return [...transactions, ...recurrentToTransactions];
  }

  async createAllRecurrentTransactions(
    recurrentTransactions: RecurrentTransaction[],
    user: User,
  ): Promise<Transaction[]> {
    return Promise.all(
      recurrentTransactions.map(
        async recurrent =>
          await this.createNewTransactionByData(recurrent, user),
      ),
    );
  }

  private createNewTransactionByData(
    recurrent: RecurrentTransaction,
    user: User,
  ): Promise<Transaction> {
    const dto: CreateTransactionEntity = {
      recurrentTransaction: recurrent,
      ...recurrent,
      isRecurrent: true,
      user,
    };

    const sanitized = plainToClass(CreateTransactionEntity, dto, {
      excludeExtraneousValues: true,
    });

    return this.transactionRepository.create(sanitized);
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
