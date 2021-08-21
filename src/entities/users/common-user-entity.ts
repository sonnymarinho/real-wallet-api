import { Exclude, Expose } from 'class-transformer';
import { IUser } from './user-interface';

@Expose()
export class CommonUserEntity implements IUser {
  constructor(props: Partial<CommonUserEntity> = {}) {
    Object.assign(this, props);
  }

  id: string;

  name: string;

  email: string;

  @Exclude({ toPlainOnly: true })
  password: string;
}
