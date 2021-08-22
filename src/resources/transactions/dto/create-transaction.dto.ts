import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTransactionDto
  implements Prisma.TransactionUncheckedCreateInput
{
  @IsNumber()
  value: number;

  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsString()
  @IsOptional()
  userId: string;
}
