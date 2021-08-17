import { Inject, Injectable } from '@nestjs/common';
import { Providers } from '@root/config/providers';
import { AbstractTransactionsRepository } from '@root/repositories/transactions/abstract-transactions-repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(Providers.TransactionsRespository)
    private repository: AbstractTransactionsRepository,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const transaction = await this.repository.create(createTransactionDto);
    return transaction;
  }

  findAll(): string {
    return 'Transactions routes working';
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
