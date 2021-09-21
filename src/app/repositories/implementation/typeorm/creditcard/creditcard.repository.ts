import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { User } from 'src/app/resources/users/entities/user.entity';
import { endOfMonth, startOfMonth } from 'date-fns';
import { UpdateTransactionInput } from 'src/app/resources/transactions/dto/update-transaction.input';
import { CreateTransactionEntity } from 'src/app/resources/transactions/dto/create-transaction-entity';
import { Creditcard } from 'src/app/resources/creditcard/entities/creditcard.entity';
import { CreateCreditcardInput } from 'src/app/resources/creditcard/dto/create-creditcard.input';

type BalanceQueryResult = {
  incomes: number;
  expenses: number;
  balance: number;
};

@Injectable()
export class CreditCardRepository {
  constructor(
    @InjectRepository(Creditcard)
    private readonly typeorm: Repository<Creditcard>,
  ) {}

  async create(dto: CreateCreditcardInput): Promise<Creditcard> {
    const transaction = await this.typeorm.create(dto);

    await this.typeorm.save(transaction);

    return transaction;
  }
  async findAllByUser(user: Creditcard['user']): Promise<Creditcard[]> {
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
      relations: ['recurrentTransaction'],
    });
  }

  async findOne(id: Creditcard['id']): Promise<Creditcard> {
    return this.typeorm.findOne({ where: { id } });
  }

  async update(
    id: Creditcard['id'],
    dto: UpdateTransactionInput,
  ): Promise<Creditcard> {
    return this.typeorm.save({ ...dto, id });
  }

  async remove(id: Creditcard['id']): Promise<void> {
    await this.typeorm.delete(id);
  }
}
