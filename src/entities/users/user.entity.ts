import { Prisma } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Expose()
export class UserEntity implements Prisma.UserUncheckedCreateInput {
  constructor(props: Partial<UserEntity> = {}) {
    Object.assign(this, props);
  }

  id?: string;

  name: string;

  email: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  Transaction?: Prisma.TransactionUncheckedCreateNestedManyWithoutUserInput;
}
