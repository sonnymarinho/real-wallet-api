import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@root/repositories/prisma/prisma.service';
import { UsersRepository } from './users';

@Global()
@Module({
  imports: [],
  providers: [PrismaService, UsersRepository],
  exports: [UsersRepository],
})
export class RepositoriesModule {}
