import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { RepositoriesModule } from '../../repositories/repositories.module';
import { ProvidersModule } from '../../providers/providers.module';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [RepositoriesModule, ProvidersModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService, ProvidersModule],
})
export class UsersModule {}
