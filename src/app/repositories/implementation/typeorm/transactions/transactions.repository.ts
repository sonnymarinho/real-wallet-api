import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTransactionInput } from 'src/app/resources/transactions/dto/update-transaction.input';
import { Transaction } from 'src/app/resources/transactions/entities/transaction.entity';
import { User } from 'src/app/resources/users/entities/user.entity';
import { Repository, Between } from 'typeorm';
import { startOfMonth, endOfMonth } from 'date-fns';
import { CreateTransactionEntity } from 'src/app/resources/transactions/dto/create-transaction-entity';
import { DashboardStatus } from 'src/app/resources/transactions/entities/dashboard-status.entity';

type BalanceStatusResult = {
  incomes: number;
  expenses: number;
  balance: number;
};

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly typeorm: Repository<Transaction>,
  ) {}

  async create(dto: CreateTransactionEntity): Promise<Transaction> {
    const transaction = await this.typeorm.create(dto);

    await this.typeorm.save(transaction);

    return transaction;
  }
  async findAllByUser(user: Transaction['user']): Promise<Transaction[]> {
    return this.typeorm.find({ where: { user } });
  }

  findTransactionsInMonth({ id }: User, year: number, month: number) {
    const startRange = startOfMonth(new Date(year, month - 1)).toISOString();
    const endRange = endOfMonth(new Date(year, month - 1)).toISOString();

    return this.typeorm.find({
      where: {
        user: { id },
        date: Between(startRange, endRange),
      },
      relations: ['recurrentTransaction'],
    });
  }

  async getMonthBalance(user: User, year: number, month: number) {
    const formattedMonth = String(month).padStart(2, '0');

    const period = `${year}-${formattedMonth}`;

    const [result] = await this.typeorm.query(`
      select
        sum(incomes) as "incomes",
        sum(expenses) as "expenses",
        sum(incomes) - sum(expenses) as "balance"
      from
        (
        select
          coalesce(sum(t."value") filter(where t."type" = 'income'), 0) as "incomes",
          coalesce(sum(t."value") filter(where t."type" = 'expense'), 0) as "expenses",
          to_char(t."date", 'YYYY-MM') as "period"
        from
          "transactions" "t"
        group by
          t."date") "status"
      where
        period like '${period}';
    `);

    const { incomes, expenses, balance } = result;

    return new DashboardStatus({ incomes, expenses, balance });
  }

  async findOne(id: Transaction['id']): Promise<Transaction> {
    return this.typeorm.findOne({ where: { id } });
  }

  async update(
    id: Transaction['id'],
    dto: UpdateTransactionInput,
  ): Promise<Transaction> {
    return this.typeorm.save({ ...dto, id });
  }

  async remove(id: Transaction['id']): Promise<void> {
    await this.typeorm.delete(id);
  }
}
