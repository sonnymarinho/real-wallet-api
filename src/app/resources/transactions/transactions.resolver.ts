import {
  UseGuards,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionDto } from './dto/update-transaction.input';
import { Transaction } from './entities/transaction.entity';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators/current-user';
import { User } from '../users/entities/user.entity';

@UseGuards(JwtGuard)
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludePrefixes: ['_'] })
@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Mutation(() => Transaction)
  createTransaction(
    @Args('createTransactionInput') input: CreateTransactionInput,
    @CurrentUser() user: User,
  ) {
    return this.transactionsService.create(input, user);
  }

  @Query(() => [Transaction], { name: 'transaction' })
  findAllTransactionsByUserId(@CurrentUser() user: User) {
    return this.transactionsService.findAllByUser(user);
  }

  @Query(() => Transaction, { name: 'transaction' })
  findTransactionById(
    @Args('id', { type: () => String }) id: Transaction['id'],
  ) {
    return this.transactionsService.findOne(id);
  }

  @Mutation(() => Transaction)
  updateTransaction(
    @Args('updateTransactionInput') input: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(input.id, input);
  }

  @Mutation(() => Transaction)
  deleteTransaction(@Args('id', { type: () => String }) id: Transaction['id']) {
    return this.transactionsService.remove(id);
  }
}
