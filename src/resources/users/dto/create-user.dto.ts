import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UserEntity } from '@resources/users/entities/user.entity';

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
