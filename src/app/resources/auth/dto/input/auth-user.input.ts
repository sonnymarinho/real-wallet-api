import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class AuthUserInput {
  @Field()
  @IsEmail()
  email: string;

  @IsString()
  @Field()
  password: string;
}
