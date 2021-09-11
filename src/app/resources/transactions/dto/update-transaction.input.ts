import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionInput } from './create-transaction.input';

@InputType()
export class UpdateTransactionDto extends PartialType(CreateTransactionInput) {
  @Field({ description: 'Transaction id based on uuid' })
  id: string;
}
