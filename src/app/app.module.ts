import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProvidersModule } from './providers/providers.module';
import { AuthModule } from './resources/auth/auth.module';
import { TransactionsModule } from './resources/transactions/transactions.module';
import { UsersModule } from './resources/users/users.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ProvidersModule,
    TransactionsModule,
    GraphQLModule.forRoot({
      include: [UsersModule, TransactionsModule, AuthModule],
      autoSchemaFile: true,
    }),
  ],
  providers: [],
  exports: [ProvidersModule],
})
export class AppModule {}
