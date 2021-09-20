import { Inject, Injectable } from '@nestjs/common';
import { PROVIDER } from '../../config/providers-name';
import { TransactionsRepository } from 'src/app/repositories/implementation/typeorm/transactions/transactions.repository';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { Transaction } from './entities/transaction.entity';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { User } from '../users/entities/user.entity';
import { TransactionsHelper } from './transactions.helper';
import { RecurrentTransaction } from './entities/recurrent-transaction.entity';
import { CreateTransactionEntity } from './dto/create-transaction-entity';
import { plainToClass } from 'class-transformer';
import { addMonths } from 'date-fns';
import { RecurrentTransactionsService } from './recurrent-transactions.service';

@Injectable()
export class TransactionsService extends TransactionsHelper {
  constructor(
    @Inject(PROVIDER.TRANSACTIONS.REPOSITORY)
    private readonly transactionRepository: TransactionsRepository,
    private readonly recurrentTransactionsService: RecurrentTransactionsService,
  ) {
    super();
  }

  async create(dto: CreateTransactionInput, user: User): Promise<Transaction> {
    const { isPermanent, installments } = dto;

    const data = { ...dto, user };

    if (installments) {
      const recurrent = await this.recurrentTransactionsService.create(data);

      const createdTransactions = await Promise.all(
        [...new Array(installments)].map((_, index) => {
          const { date, value } = data;
          const newValidMonth = addMonths(date, index);
          const installmentAmount = Number(
            parseFloat(String(value / installments)).toFixed(2),
          );

          const adjustedData: CreateTransactionEntity = {
            ...data,
            date: newValidMonth,
            recurrentTransaction: recurrent,
            value: installmentAmount,
          };

          return this.transactionRepository.create(adjustedData);
        }),
      );

      return createdTransactions[0];
    }

    const recurrentTransaction = isPermanent
      ? await this.recurrentTransactionsService.create(data)
      : undefined;

    const transaction = await this.transactionRepository.create({
      ...data,
      recurrentTransaction,
    });

    return transaction;
  }

  findAllByUser(user: Transaction['user']): Promise<Transaction[]> {
    return this.transactionRepository.findAllByUser(user);
  }

  async findTransactionsInMonth(user: User, year: number, month: number) {
    return this.performMonthTransactions(user, year, month);
  }

  public async performMonthTransactions(
    user: User,
    year: number,
    month: number,
  ): Promise<Transaction[]> {
    const recurrentTransactions =
      await this.recurrentTransactionsService.findPermanentTransactionsAfterThisMonth(
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
        const updatedDate = new Date(year, month - 1, date.getDate());

        return { ...data, date: updatedDate };
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
      isPermanent: true,
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
