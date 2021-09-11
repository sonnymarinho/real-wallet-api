import { User } from '../../users/entities/user.entity';

export interface IAuthResponse {
  user: Omit<User, 'password'>;
  access_token: string;
}
