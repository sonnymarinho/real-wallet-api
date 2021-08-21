import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Bcrypt } from '@root/providers/cryptography/implementations/bcrypt';
import { PROVIDERS } from '@root/config/providers';

import { RepositoriesModule } from '@root/repositories/implementations';

@Module({
  imports: [RepositoriesModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: PROVIDERS.HASH,
      useClass: Bcrypt,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
