import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@root/repositories/prisma/prisma.service';
import { TransactionsRepository } from './transactions.repository';
import { UsersRepository } from './users.repository';

const repositories = [UsersRepository, TransactionsRepository];
@Global()
@Module({
  imports: [],
  providers: [PrismaService, ...repositories],
  exports: [...repositories],
})
export class RepositoriesModule {}
