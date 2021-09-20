import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTransactionInput } from 'src/app/resources/transactions/dto/update-transaction.input';
import { User } from 'src/app/resources/users/entities/user.entity';
import { Repository, Between, LessThanOrEqual } from 'typeorm';
import { startOfMonth, endOfMonth } from 'date-fns';
import { RecurrentTransaction } from 'src/app/resources/transactions/entities/recurrent-transaction.entity';
import { CreateRecurrentRecurrentTransactionEntity } from 'src/app/resources/transactions/dto/create-recurrent-transaction-entity';

@Injectable()
export class RecurrentTransactionsRepository {
  constructor(
    @InjectRepository(RecurrentTransaction)
    private readonly typeorm: Repository<RecurrentTransaction>,
  ) {}

  async create(
    dto: CreateRecurrentRecurrentTransactionEntity,
  ): Promise<RecurrentTransaction> {
    const transaction = this.typeorm.create(dto);

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

  findPermanentTransactionsAfterThisMonth(
    { id }: User,
    year: number,
    month: number,
  ) {
    const startRange = startOfMonth(new Date(year, month - 1)).toISOString();

    return this.typeorm.find({
      where: {
        user: { id },
        date: LessThanOrEqual(startRange),
        isPermanent: true,
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
