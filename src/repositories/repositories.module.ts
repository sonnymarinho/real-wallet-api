import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../resources/users/entities/user.entity';
import { TypeOrmConnectionModule } from './implementation/typeorm/typeorm-connection';
import { UsersRepository } from './implementation/typeorm/users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmConnectionModule],
  providers: [
    {
      provide: 'UsersRepository',
      useClass: UsersRepository,
    },
  ],
  exports: ['UsersRepository'],
})
export class RepositoriesModule {}
