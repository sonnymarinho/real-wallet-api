import { Inject, Injectable } from '@nestjs/common';
import { PROVIDER } from '../../config/providers-name';
import { TransactionsRepository } from 'src/repositories/implementation/typeorm/transactions/transactions.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { UsersService } from 'src/resources/users/users.service';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(PROVIDER.TRANSACTIONS.REPOSITORY)
    private readonly repository: TransactionsRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(dto: CreateTransactionDto): Promise<Transaction> {
    const user = await this.usersService.findById(dto.user.id);
    return this.repository.create({ ...dto, user });
  }

  findAllByUser(user: Transaction['user']): Promise<Transaction[]> {
    return this.repository.findAllByUser(user);
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
