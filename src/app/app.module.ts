import { Module } from '@nestjs/common';
import { AuthModule } from 'src/resources/auth/auth.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UsersModule } from '../resources/users/users.module';

@Module({
  imports: [UsersModule, AuthModule, RepositoriesModule],
  providers: [],
  exports: [],
})
export class AppModule {}
