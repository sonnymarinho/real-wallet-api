import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { IAuthResponse } from '../type/auth-response';

@ObjectType()
export class Auth implements IAuthResponse {
  @Field()
  user: User;

  @Field()
  access_token: string;
}
