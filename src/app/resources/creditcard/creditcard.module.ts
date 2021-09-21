import { Module } from '@nestjs/common';
import { Creditcardervice } from './creditcard.service';
import { CreditcardResolver } from './creditcard.resolver';
import { RepositoriesModule } from 'src/app/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  providers: [CreditcardResolver, Creditcardervice],
})
export class CreditcardModule {}
