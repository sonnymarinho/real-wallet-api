import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DashboardStatus {
  constructor(props: Partial<DashboardStatus> = {}) {
    Object.assign(this, { ...props });
  }

  @Field()
  incomes: number;

  @Field()
  expenses: number;

  @Field()
  balance: number;
}
