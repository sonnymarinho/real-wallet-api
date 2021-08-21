import { User } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';

export class AuthUserDto implements Pick<User, 'email' | 'password'> {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
