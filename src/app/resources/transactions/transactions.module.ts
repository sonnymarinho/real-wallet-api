import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { RepositoriesModule } from 'src/app/repositories/repositories.module';
import { RecurrentTransactionsService } from './recurrent-transactions.service';

@Module({
  imports: [RepositoriesModule],
  providers: [
    TransactionsResolver,
    TransactionsService,
    RecurrentTransactionsService,
  ],
  exports: [TransactionsService, RecurrentTransactionsService],
})
export class TransactionsModule {}
