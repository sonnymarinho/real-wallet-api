import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from '@resources/transactions/transactions.module';
import { UsersModule } from '@resources/users/users.module';
import { AuthModule } from '@root/resources/auth/auth.module';

@Module({
  imports: [
    TransactionsModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/real-wallet:dev'),
  ],
})
export class AppModule {}
