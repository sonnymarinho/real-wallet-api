import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../resources/users/entities/user.entity';
import { UsersRepository } from './implementation/typeorm/users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: 'UsersRepository',
      useClass: UsersRepository,
    },
  ],
  exports: ['UsersRepository'],
})
export class RepositoriesModule {}
