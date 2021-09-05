import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { ProvidersModule } from 'src/providers/providers.module';

@Module({
  imports: [RepositoriesModule, ProvidersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
