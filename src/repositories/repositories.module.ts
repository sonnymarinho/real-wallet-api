import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/resources/users/entities/user.entity';
import { UsersRepository } from './users.repositories';

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
