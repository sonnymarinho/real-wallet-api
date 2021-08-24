import { Module } from '@nestjs/common';
import { UsersModule } from '@resources/users/users.module';
import { AuthModule } from '@root/resources/auth/auth.module';
import { TransactionsModule } from '@root/resources/transactions/transactions.module';
import { ConfigModule } from '@root/config/config.module';

@Module({
  imports: [ConfigModule, UsersModule, TransactionsModule, AuthModule],
})
export class AppModule {}
