import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UserEntity } from '@root/repositories/entities/users/user.entity';

export class CreateUserDto implements UserEntity {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @MaxLength(64)
  password: string;
}
