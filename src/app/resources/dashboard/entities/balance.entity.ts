import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Balance {
  constructor(props: Partial<Balance> = {}) {
    Object.assign(this, { ...props });
  }

  @Field()
  incomes: number;

  @Field()
  expenses: number;

  @Field()
  balance: number;
}
