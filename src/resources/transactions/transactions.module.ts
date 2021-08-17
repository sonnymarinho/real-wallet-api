import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Providers } from '@root/config/providers';
import { MongooseTransactionsRepository } from '@root/repositories/transactions/implementation/mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './entities/transaction.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    {
      provide: Providers.TransactionsRespository,
      useClass: MongooseTransactionsRepository,
    },
  ],
})
export class TransactionsModule {}
