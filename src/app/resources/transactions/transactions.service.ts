import { Inject, Injectable } from '@nestjs/common';
import { PROVIDER } from '../../config/providers-name';
import { TransactionsRepository } from 'src/app/repositories/implementation/transactions/transactions.repository';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionDto } from './dto/update-transaction.input';
import { Transaction } from './entities/transaction.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(PROVIDER.TRANSACTIONS.REPOSITORY)
    private readonly repository: TransactionsRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(
    dto: CreateTransactionInput,
    { id: userId }: User,
  ): Promise<Transaction> {
    const user = await this.usersService.findById(userId);
    return this.repository.create({ ...dto, user });
  }

  findAllByUser(user: Transaction['user']): Promise<Transaction[]> {
    return this.repository.findAllByUser(user);
  }

  findOne(id: Transaction['id']) {
    return `This action returns a #${id} transaction`;
  }

  update(id: Transaction['id'], updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: Transaction['id']) {
    return `This action removes a #${id} transaction`;
  }
}
