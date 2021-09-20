import { Field, ObjectType } from '@nestjs/graphql';
import { Balance } from './balance.entity';

@ObjectType()
export class Dashboard {
  constructor(props: Partial<Dashboard> = {}) {
    Object.assign(this, { ...props });
  }

  @Field()
  balance: Balance;
}
