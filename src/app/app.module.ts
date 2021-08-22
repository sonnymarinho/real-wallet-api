import { Module } from '@nestjs/common';
import { UsersModule } from '@resources/users/users.module';
import { AuthModule } from '@root/resources/auth/auth.module';
import { TransactionsModule } from '@root/resources/transactions/transactions.module';

@Module({
  imports: [UsersModule, TransactionsModule, AuthModule],
})
export class AppModule {}
