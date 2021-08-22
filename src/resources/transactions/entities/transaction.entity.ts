import { Prisma } from '@prisma/client';
import { Transform, Type } from 'class-transformer';

export class TransactionEntity
  implements Prisma.TransactionUncheckedCreateInput
{
  constructor(props: Partial<TransactionEntity> = {}) {
    Object.assign(this, props);
  }

  id?: string;

  @Transform(({ value }) => value.toNumber(), { toClassOnly: true })
  value: number;

  title: string;

  description?: string;

  userId: string;
}
