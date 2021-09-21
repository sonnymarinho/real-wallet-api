import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProvidersModule } from './providers/providers.module';
import { AuthModule } from './resources/auth/auth.module';
import { CreditcardModule } from './resources/creditcard/creditcard.module';
import { DashboardModule } from './resources/dashboard/dashboard.module';
import { TransactionsModule } from './resources/transactions/transactions.module';
import { UsersModule } from './resources/users/users.module';

const resourcesModule = [
  UsersModule,
  TransactionsModule,
  DashboardModule,
  AuthModule,
  CreditcardModule,
];
@Module({
  imports: [
    ...resourcesModule,
    ProvidersModule,
    GraphQLModule.forRoot({
      include: [...resourcesModule],
      autoSchemaFile: true,
    }),
  ],
  exports: [ProvidersModule],
})
export class AppModule {}
