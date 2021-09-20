import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PROVIDER } from '../config/providers-name';
import { RecurrentTransaction } from '../resources/transactions/entities/recurrent-transaction.entity';
import { Transaction } from '../resources/transactions/entities/transaction.entity';
import { User } from '../resources/users/entities/user.entity';
import { DashboardRepository } from './implementation/typeorm/dashboard/dashboard.repository';
import { RecurrentTransactionsRepository } from './implementation/typeorm/transactions/recurrent-transactions.repository';
import { TransactionsRepository } from './implementation/typeorm/transactions/transactions.repository';
import { TypeOrmConnectionModule } from './implementation/typeorm/typeorm-connection';
import { UsersRepository } from './implementation/typeorm/users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Transaction, RecurrentTransaction]),
    TypeOrmConnectionModule,
  ],
  providers: [
    {
      provide: PROVIDER.USERS.REPOSITORY,
      useClass: UsersRepository,
    },
    {
      provide: PROVIDER.TRANSACTIONS.REPOSITORY,
      useClass: TransactionsRepository,
    },
    {
      provide: PROVIDER.RECURRENT_TRANSACTIONS.REPOSITORY,
      useClass: RecurrentTransactionsRepository,
    },
    {
      provide: PROVIDER.DASHBOARD.REPOSITORY,
      useClass: DashboardRepository,
    },
  ],
  exports: [
    PROVIDER.USERS.REPOSITORY,
    PROVIDER.TRANSACTIONS.REPOSITORY,
    PROVIDER.RECURRENT_TRANSACTIONS.REPOSITORY,
    PROVIDER.DASHBOARD.REPOSITORY,
  ],
})
export class RepositoriesModule {}
