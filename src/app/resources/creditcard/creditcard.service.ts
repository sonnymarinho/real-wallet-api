import { Inject, Injectable } from '@nestjs/common';
import { PROVIDER } from 'src/app/config/providers-name';
import { CreditCardRepository } from 'src/app/repositories/implementation/typeorm/creditcard/creditcard.repository';
import { CreateCreditcardInput } from './dto/input/create-creditcard.input';

@Injectable()
export class Creditcardervice {
  constructor(
    @Inject(PROVIDER.CREDIT_CARD.REPOSITORY)
    private readonly transactionRepository: CreditCardRepository,
  ) {}

  create(createCreditcardInput: CreateCreditcardInput) {
    return this.transactionRepository.create(createCreditcardInput);
  }
}
