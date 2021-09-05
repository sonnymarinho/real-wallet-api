import { Module } from '@nestjs/common';
import { ProvidersModule } from '../providers/providers.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UsersModule } from '../resources/users/users.module';

@Module({
  imports: [UsersModule, RepositoriesModule],
})
export class AppModule {}
