import { Field, InputType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TransactionType } from '../../types/transaction';

@InputType()
export class CreateTransactionInput {
  @IsNumber()
  @Field()
  @Expose()
  value: number;

  @IsString()
  @MaxLength(100)
  @Field()
  @Expose()
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  @Field({ nullable: true })
  @Expose()
  description?: string;

  @Field()
  @IsEnum(TransactionType, {
    message: "The transaction type must be or 'income' or 'expense'.",
  })
  @Expose()
  type: TransactionType;

  @Field({ defaultValue: false, nullable: true })
  @IsBoolean()
  @IsOptional()
  @Expose()
  isPermanent?: boolean;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  @Expose()
  installments?: number;

  @IsDate()
  @IsOptional()
  @Field(() => Date, { nullable: true })
  @Expose()
  date = new Date();

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  @Expose()
  creditCardId?: string;

  @Field({ defaultValue: false, nullable: true })
  @IsBoolean()
  @IsOptional()
  @Expose()
  isConfirmed?: boolean;
}
