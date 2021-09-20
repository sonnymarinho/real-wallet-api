import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardResolver } from './dashboard.resolver';
import { TransactionsModule } from '../transactions/transactions.module';
import { RepositoriesModule } from 'src/app/repositories/repositories.module';
import { TransactionsService } from '../transactions/transactions.service';

@Module({
  imports: [TransactionsModule, RepositoriesModule],
  providers: [DashboardResolver, DashboardService, TransactionsService],
})
export class DashboardModule {}
