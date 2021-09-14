import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { RepositoriesModule } from 'src/app/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  providers: [TransactionsResolver, TransactionsService],
})
export class TransactionsModule {}
