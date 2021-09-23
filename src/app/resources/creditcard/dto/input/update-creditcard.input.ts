import { CreateCreditcardInput } from './create-creditcard.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdateCreditcardInput extends PartialType(CreateCreditcardInput) {
  @IsString()
  @Field()
  id: string;

  @IsString()
  @Field()
  title: string;

  @IsString()
  @Field({ nullable: true })
  description?: string;
}
