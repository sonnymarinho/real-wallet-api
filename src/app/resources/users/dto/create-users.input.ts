import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field({ description: 'The user name like <Name Surname>' })
  @IsString()
  name: string;

  @Field({ description: 'Alphanumeric password' })
  @IsString()
  password: string;

  @Field({ description: 'Valid user e-mail.' })
  @IsEmail()
  email: string;
}
