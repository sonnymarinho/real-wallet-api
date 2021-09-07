import { IsEmail, IsString } from 'class-validator';

export class UserAuthDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
