import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/app/resources/transactions/entities/transaction.entity';
import { User } from 'src/app/resources/users/entities/user.entity';
import { Repository } from 'typeorm';

type BalanceQueryResult = {
  incomes: number;
  expenses: number;
  balance: number;
};

@Injectable()
export class DashboardRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly typeorm: Repository<Transaction>,
  ) {}

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

    return result as BalanceQueryResult;
  }
}
