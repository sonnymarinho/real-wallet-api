import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCreditcardInput {
  @IsString()
  @Field()
  title: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description?: string;
}
