import { Inject, Injectable } from '@nestjs/common';
import { PROVIDER } from '../../config/providers-name';
import { User } from '../users/entities/user.entity';
import { RecurrentTransactionsRepository } from 'src/app/repositories/implementation/typeorm/transactions/recurrent-transactions.repository';
import { RecurrentTransaction } from './entities/recurrent-transaction.entity';
import { CreateRecurrentRecurrentTransactionEntity } from './dto/entity/create-recurrent-transaction-entity';

@Injectable()
export class RecurrentTransactionsService {
  constructor(
    @Inject(PROVIDER.RECURRENT_TRANSACTIONS.REPOSITORY)
    private readonly recurrentTransactionsRepository: RecurrentTransactionsRepository,
  ) {}

  create(
    data: CreateRecurrentRecurrentTransactionEntity,
  ): Promise<RecurrentTransaction> {
    return this.recurrentTransactionsRepository.create(data);
  }

  public async findPermanentTransactionsAfterThisMonth(
    user: User,
    year: number,
    month: number,
  ): Promise<RecurrentTransaction[]> {
    return this.recurrentTransactionsRepository.findPermanentTransactionsAfterThisMonth(
      user,
      year,
      month,
    );
  }
}
