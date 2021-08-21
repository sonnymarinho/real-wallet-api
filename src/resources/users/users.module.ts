import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Bcrypt } from '@root/providers/cryptography/implementations/bcrypt';
import { PROVIDERS } from '@root/config/providers';
import { MongooseUsersRepository } from '@root/repositories/implementations/mongoose/users';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MongooseUserEntity,
  UserSchema,
} from '@root/entities/users/implementations/mongoose-user-entity';
import { MongooseRepositoryModule } from '@root/repositories/implementations/mongoose';

@Module({
  imports: [MongooseRepositoryModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: PROVIDERS.HASH,
      useClass: Bcrypt,
    },
    {
      provide: PROVIDERS.USER.REPOSITORY,
      useClass: MongooseUsersRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
