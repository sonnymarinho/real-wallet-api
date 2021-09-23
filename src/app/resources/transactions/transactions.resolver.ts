import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/input/create-transaction.input';
import { UpdateTransactionInput } from './dto/input/update-transaction.input';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user';
import { User } from '../users/entities/user.entity';

@UseGuards(JwtGuard)
@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Mutation(() => Transaction)
  createTransaction(
    @Args('createTransactionInput')
    createTransactionInput: CreateTransactionInput,
    @CurrentUser() user: User,
  ) {
    return this.transactionsService.create(createTransactionInput, user);
  }

  @Query(() => [Transaction], { name: 'findAllMyTransactions' })
  findAllMyTransactions(@CurrentUser() user: User) {
    return this.transactionsService.findAllByUser(user);
  }

  @Query(() => [Transaction], { name: 'findTransactionsInMonth' })
  findTransactionsInMonth(
    @Args('month', { type: () => Number }) month: number,
    @Args('year', { type: () => Number }) year: number,
    @CurrentUser() user: User,
  ) {
    return this.transactionsService.findTransactionsInMonth(user, year, month);
  }

  @Query(() => Transaction, { name: 'transactions' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.transactionsService.findOne(id);
  }

  @Mutation(() => Transaction)
  updateTransaction(
    @Args('updateTransactionInput')
    updateTransactionInput: UpdateTransactionInput,
  ) {
    return this.transactionsService.update(
      updateTransactionInput.id,
      updateTransactionInput,
    );
  }

  @Mutation(() => Transaction)
  removeTransaction(@Args('id', { type: () => String }) id: string) {
    return this.transactionsService.remove(id);
  }
}
