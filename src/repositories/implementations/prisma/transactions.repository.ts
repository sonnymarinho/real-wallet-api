import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Transaction } from '@prisma/client';
import { AbstractTransactionsRepository } from '../../abstract/abstract-transactions-repository';
import { CreateTransactionDto } from '@root/resources/transactions/dto/create-transaction.dto';
import { UpdateTransactionDto } from '@root/resources/transactions/dto/update-transaction.dto';
import { TransactionEntity } from '@root/resources/transactions/entities/transaction.entity';

@Injectable()
export class TransactionsRepository extends AbstractTransactionsRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(dto: CreateTransactionDto): Promise<TransactionEntity> {
    const data: Prisma.TransactionUncheckedCreateInput = { ...dto };

    const transaction = await this.prisma.transaction.create({ data });

    const parsed = this.toEntity(transaction);

    return parsed;
  }
  async findAllByUserId(
    userId: Transaction['userId'],
  ): Promise<TransactionEntity[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId },
    });

    return this.toEntityArray(transactions);
  }
  async findOne(id: Transaction['id']): Promise<TransactionEntity> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    return this.toEntity(transaction);
  }
  async update(
    id: Transaction['id'],
    dto: UpdateTransactionDto,
  ): Promise<TransactionEntity> {
    const data: Prisma.TransactionUpdateInput = { ...dto };

    const updatedTransaction = await this.prisma.transaction.update({
      data,
      where: { id },
    });

    return this.toEntity(updatedTransaction);
  }
  async remove(id: Transaction['id']): Promise<void> {
    await this.prisma.transaction.delete({ where: { id } });
  }
}
