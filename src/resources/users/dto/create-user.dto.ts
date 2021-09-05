import { User } from '../entities/user.entity';

export class CreateUserDto implements Partial<User> {
  name: string;
  password: string;
  email: string;
}
