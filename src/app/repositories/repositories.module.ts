import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PROVIDER } from '../config/providers-name';
import { Transaction } from '../resources/transactions/entities/transaction.entity';
import { User } from '../resources/users/entities/user.entity';
import { TransactionsRepository } from './implementation/transactions/transactions.repository';
import { TypeOrmConnectionModule } from './implementation/typeorm/typeorm-connection';
import { UsersRepository } from './implementation/typeorm/users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Transaction]),
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
  ],
  exports: [PROVIDER.USERS.REPOSITORY, PROVIDER.TRANSACTIONS.REPOSITORY],
})
export class RepositoriesModule {}
