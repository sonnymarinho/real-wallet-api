import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { User } from '../../users/entities/user.entity';

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
}
