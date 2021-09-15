import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

@InputType()
export class CreateTransactionInput {
  @IsNumber()
  @Field()
  value: number;

  @IsString()
  @MaxLength(100)
  @Field()
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  @Field()
  description?: string;

  @Field()
  @IsEnum(TransactionType, {
    message: "The transaction type must be or 'income' or 'expense'.",
  })
  type: TransactionType;

  @Field({ defaultValue: false, nullable: true })
  @IsBoolean()
  @IsOptional()
  isPeriodically: false;

  @IsDate()
  @IsOptional()
  @Field(type => Date, { nullable: true })
  date = new Date();

  @Field({ defaultValue: false, nullable: true })
  @IsBoolean()
  @IsOptional()
  isConfirmed: false;
}
