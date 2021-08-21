import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserUncheckedCreateInput {
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
