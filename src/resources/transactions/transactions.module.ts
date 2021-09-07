import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { RepositoriesModule } from '../../repositories/repositories.module';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [RepositoriesModule, UsersModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, UsersService],
})
export class TransactionsModule {}
