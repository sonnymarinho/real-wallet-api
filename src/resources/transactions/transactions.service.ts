import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { TransactionsRepository } from '@root/repositories/implementations/prisma/transactions.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionEntity } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(private readonly repository: TransactionsRepository) {}

  create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionEntity> {
    return this.repository.create(createTransactionDto);
  }

  findAllByUserId(userId: Transaction['userId']): Promise<TransactionEntity[]> {
    return this.repository.findAllByUserId(userId);
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
