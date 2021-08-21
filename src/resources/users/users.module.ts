import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Bcrypt } from '@root/providers/cryptography/implementations/bcrypt';

import { RepositoriesModule } from '@root/repositories/implementations';

@Module({
  imports: [RepositoriesModule],
  controllers: [UsersController],
  providers: [UsersService, Bcrypt],
  exports: [UsersService],
})
export class UsersModule {}
