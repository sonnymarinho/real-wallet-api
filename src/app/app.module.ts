import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProvidersModule } from './providers/providers.module';
import { AuthModule } from './resources/auth/auth.module';
import { DashboardModule } from './resources/dashboard/dashboard.module';
import { TransactionsModule } from './resources/transactions/transactions.module';
import { UsersModule } from './resources/users/users.module';

const graphqlResourcesModule = [
  UsersModule,
  TransactionsModule,
  DashboardModule,
  AuthModule,
];
@Module({
  imports: [
    ...graphqlResourcesModule,
    ProvidersModule,
    GraphQLModule.forRoot({
      include: [...graphqlResourcesModule],
      autoSchemaFile: true,
    }),
  ],
  providers: [],
  exports: [ProvidersModule],
})
export class AppModule {}
