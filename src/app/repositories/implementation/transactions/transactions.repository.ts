import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionInput } from 'src/app/resources/transactions/dto/create-transaction.input';
import { UpdateTransactionInput } from 'src/app/resources/transactions/dto/update-transaction.input';
import { Transaction } from 'src/app/resources/transactions/entities/transaction.entity';
import { User } from 'src/app/resources/users/entities/user.entity';
import { Repository, Between } from 'typeorm';
import { startOfMonth, endOfMonth } from 'date-fns';

type CreateTransaction = CreateTransactionInput & { user: User };
@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly typeorm: Repository<Transaction>,
  ) {}

  async create(dto: CreateTransaction): Promise<Transaction> {
    const transaction = await this.typeorm.create(dto);

    await this.typeorm.save(transaction);

    return transaction;
  }
  async findAllByUser(user: Transaction['user']): Promise<Transaction[]> {
    return this.typeorm.find({ where: { user } });
  }

  findTransactionsInMonth({ id }: User, year: number, month: number) {
    const startRange = startOfMonth(new Date(year, month - 1)).toISOString();
    const endRange = endOfMonth(new Date(year, month - 1)).toISOString();

    return this.typeorm.find({
      where: {
        user: { id },
        date: Between(startRange, endRange),
      },
    });
  }

  async findOne(id: Transaction['id']): Promise<Transaction> {
    return this.typeorm.findOne({ where: { id } });
  }

  async update(
    id: Transaction['id'],
    dto: UpdateTransactionInput,
  ): Promise<Transaction> {
    return this.typeorm.save({ ...dto, id });
  }

  async remove(id: Transaction['id']): Promise<void> {
    await this.typeorm.delete(id);
  }
}
