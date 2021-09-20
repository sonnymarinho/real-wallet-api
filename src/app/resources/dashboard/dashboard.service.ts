import { Inject, Injectable } from '@nestjs/common';
import { PROVIDER } from 'src/app/config/providers-name';
import { DashboardRepository } from 'src/app/repositories/implementation/typeorm/dashboard/dashboard.repository';
import { TransactionsService } from '../transactions/transactions.service';
import { User } from '../users/entities/user.entity';
import { Balance } from './entities/balance.entity';
import { Dashboard } from './entities/dashboard.entity';

@Injectable()
export class DashboardService {
  constructor(
    @Inject(PROVIDER.DASHBOARD.REPOSITORY)
    private readonly dashboardRepository: DashboardRepository,
    private readonly transactionsService: TransactionsService,
  ) {}

  async getMonthBalance(user: User, year: number, month: number) {
    await this.transactionsService.performMonthTransactions(user, year, month);

    const { incomes, expenses, balance } =
      await this.dashboardRepository.getMonthBalance(user, year, month);

    const balanceEntity = new Balance({ incomes, expenses, balance });

    return new Dashboard({ balance: balanceEntity });
  }
}
