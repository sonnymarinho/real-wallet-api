import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { AbstractTransactionsRepository } from '@repositories/transactions/abstract-transactions-repository';
import { CreateTransactionDto } from '@root/resources/transactions/dto/create-transaction.dto';
import {
  Transaction,
  TransactionDocument,
} from '@root/resources/transactions/entities/transaction.entity';
import { UpdateTransactionDto } from '@root/resources/transactions/dto/update-transaction.dto';

@Injectable()
export class MongooseTransactionsRepository extends AbstractTransactionsRepository {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {
    super();
  }

  private toPlainClass(document: TransactionDocument): Transaction {
    return plainToClass(Transaction, document?.toObject());
  }

  async create(dto: CreateTransactionDto): Promise<Transaction> {
    const { user, ...data } = dto;

    console.log('mongoose dto : ', dto);

    const transaction = {
      ...data,
      user: user._id,
    };

    const transactionDocument = await this.transactionModel.create(transaction);
    return this.toPlainClass(transactionDocument);
  }

  async findAll(): Promise<Transaction[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(id: Transaction['id']): Promise<Transaction> {
    const transactionDocument = await this.transactionModel.findOne({ id });
    return this.toPlainClass(transactionDocument);
  }

  async update(
    id: Transaction['id'],
    dto: UpdateTransactionDto,
  ): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }
  async remove(id: Transaction['id']): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
