import { Module } from '@nestjs/common';
import { ProvidersModule } from 'src/providers/providers.module';
import { AuthModule } from '../resources/auth/auth.module';
import { TransactionsModule } from '../resources/transactions/transactions.module';
import { UsersModule } from '../resources/users/users.module';

@Module({
  imports: [UsersModule, TransactionsModule, AuthModule, ProvidersModule],
  providers: [],
  exports: [ProvidersModule],
})
export class AppModule {}
