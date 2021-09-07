import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto } from 'src/resources/transactions/dto/create-transaction.dto';
import { UpdateTransactionDto } from 'src/resources/transactions/dto/update-transaction.dto';
import { Transaction } from 'src/resources/transactions/entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly typeorm: Repository<Transaction>,
  ) {}

  async create(dto: CreateTransactionDto): Promise<Transaction> {
    const transaction = await this.typeorm.create(dto);

    await this.typeorm.save(transaction);

    return transaction;
  }
  async findAllByUser(user: Transaction['user']): Promise<Transaction[]> {
    return this.typeorm.find({ where: { user } });
  }
  async findOne(id: Transaction['id']): Promise<Transaction> {
    return this.typeorm.findOne({ where: { id } });
  }
  async update(
    id: Transaction['id'],
    dto: UpdateTransactionDto,
  ): Promise<Transaction> {
    return this.typeorm.save({ ...dto, id });
  }
  async remove(id: Transaction['id']): Promise<void> {
    await this.typeorm.delete(id);
  }
}
