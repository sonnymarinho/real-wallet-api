import { UserEntity } from '@root/repositories/entities/users/user.entity';
import { IsEmail, IsString } from 'class-validator';

export class AuthUserDto implements Pick<UserEntity, 'email' | 'password'> {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
