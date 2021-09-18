import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionInput } from 'src/app/resources/transactions/dto/create-transaction.input';
import { UpdateTransactionInput } from 'src/app/resources/transactions/dto/update-transaction.input';
import { User } from 'src/app/resources/users/entities/user.entity';
import { Repository, Between, LessThanOrEqual } from 'typeorm';
import { startOfMonth, endOfMonth } from 'date-fns';
import { RecurrentTransaction } from 'src/app/resources/transactions/entities/recurrent-transaction.entity';

type CreateRecurrentRecurrentTransaction = CreateTransactionInput & {
  user: User;
};
@Injectable()
export class RecurrentTransactionsRepository {
  constructor(
    @InjectRepository(RecurrentTransaction)
    private readonly typeorm: Repository<RecurrentTransaction>,
  ) {}

  async create(
    dto: CreateRecurrentRecurrentTransaction,
  ): Promise<RecurrentTransaction> {
    const transaction = await this.typeorm.create(dto);

    await this.typeorm.save(transaction);

    return transaction;
  }

  async findAllByUser(
    user: RecurrentTransaction['user'],
  ): Promise<RecurrentTransaction[]> {
    return this.typeorm.find({ where: { user } });
  }

  findRecurrentTransactionsInMonth({ id }: User, year: number, month: number) {
    const startRange = startOfMonth(new Date(year, month - 1)).toISOString();
    const endRange = endOfMonth(new Date(year, month - 1)).toISOString();

    return this.typeorm.find({
      where: {
        user: { id },
        date: Between(startRange, endRange),
      },
    });
  }

  findRecurrentTransactionsAfterThisMonth(
    { id }: User,
    year: number,
    month: number,
  ) {
    const startRange = startOfMonth(new Date(year, month - 1)).toISOString();

    return this.typeorm.find({
      where: {
        user: { id },
        date: LessThanOrEqual(startRange),
      },
    });
  }

  async findOne(id: RecurrentTransaction['id']): Promise<RecurrentTransaction> {
    return this.typeorm.findOne({ where: { id } });
  }

  async update(
    id: RecurrentTransaction['id'],
    dto: UpdateTransactionInput,
  ): Promise<RecurrentTransaction> {
    return this.typeorm.save({ ...dto, id });
  }

  async remove(id: RecurrentTransaction['id']): Promise<void> {
    await this.typeorm.delete(id);
  }
}
