import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@repositories/implementations/prisma/prisma.service';
import { TransactionsRepository } from './prisma/transactions.repository';
import { UsersRepository } from './prisma/users.repository';

const repositories = [UsersRepository, TransactionsRepository];

@Global()
@Module({
  imports: [],
  providers: [PrismaService, ...repositories],
  exports: [...repositories],
})
export class RepositoriesModule {}
