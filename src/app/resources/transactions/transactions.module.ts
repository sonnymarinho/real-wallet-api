import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { RepositoriesModule } from '../../repositories/repositories.module';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [RepositoriesModule, UsersModule],
  providers: [TransactionsResolver, TransactionsService, UsersService],
})
export class TransactionsModule {}
