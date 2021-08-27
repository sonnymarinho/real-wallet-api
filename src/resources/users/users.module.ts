import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Bcrypt } from '@root/providers/cryptography/implementations/bcrypt';
import { Connection } from 'typeorm';
import { PROVIDERS } from '@root/config/providers';
import { UserEntity } from '@root/repositories/entities/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, Bcrypt],
  exports: [UsersService],
})
export class UsersModule {}
