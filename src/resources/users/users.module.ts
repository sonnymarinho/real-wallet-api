import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Bcrypt } from '@root/providers/cryptography/implementations/bcrypt';
import { MongooseUsersRepository } from '@repositories/users/implementation/mongoose';
import { Providers } from '@root/config/providers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: Providers.Hash,
      useClass: Bcrypt,
    },
    {
      provide: Providers.UsersRepository,
      useClass: MongooseUsersRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
