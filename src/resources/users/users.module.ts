import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RepositoriesModule } from '../../repositories/repositories.module';
import { ProvidersModule } from '../../providers/providers.module';

@Module({
  imports: [RepositoriesModule, ProvidersModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, ProvidersModule],
})
export class UsersModule {}
