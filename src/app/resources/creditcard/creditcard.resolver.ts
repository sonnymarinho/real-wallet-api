import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Creditcardervice } from './creditcard.service';
import { Creditcard } from './entities/creditcard.entity';
import { CreateCreditcardInput } from './dto/input/create-creditcard.input';

@Resolver(() => Creditcard)
export class CreditcardResolver {
  constructor(private readonly Creditcardservice: Creditcardervice) {}

  @Mutation(() => Creditcard)
  createCreditcard(
    @Args('createCreditcardInput') createCreditcardInput: CreateCreditcardInput,
  ) {
    return this.Creditcardservice.create(createCreditcardInput);
  }
}
