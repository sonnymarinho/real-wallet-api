import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PROVIDER } from '../config/providers-name';
import { Creditcard } from '../resources/creditcard/entities/creditcard.entity';
import { RecurrentTransaction } from '../resources/transactions/entities/recurrent-transaction.entity';
import { Transaction } from '../resources/transactions/entities/transaction.entity';
import { User } from '../resources/users/entities/user.entity';
import { CreditCardRepository } from './implementation/typeorm/creditcard/creditcard.repository';
import { DashboardRepository } from './implementation/typeorm/dashboard/dashboard.repository';
import { RecurrentTransactionsRepository } from './implementation/typeorm/transactions/recurrent-transactions.repository';
import { TransactionsRepository } from './implementation/typeorm/transactions/transactions.repository';
import { TypeOrmConnectionModule } from './implementation/typeorm/typeorm-connection';
import { UsersRepository } from './implementation/typeorm/users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Transaction,
      RecurrentTransaction,
      Creditcard,
    ]),
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
    {
      provide: PROVIDER.CREDIT_CARD.REPOSITORY,
      useClass: CreditCardRepository,
    },
  ],
  exports: [
    PROVIDER.USERS.REPOSITORY,
    PROVIDER.TRANSACTIONS.REPOSITORY,
    PROVIDER.RECURRENT_TRANSACTIONS.REPOSITORY,
    PROVIDER.DASHBOARD.REPOSITORY,
    PROVIDER.CREDIT_CARD.REPOSITORY,
  ],
})
export class RepositoriesModule {}
