import {
  ClassSerializerInterceptor,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthUserInput } from './dto/input/auth-user.input';
import { Auth } from './entities/auth.entity';

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludePrefixes: ['_'] })
@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  authUser(@Args('createUserInput') authUserInput: AuthUserInput) {
    return this.authService.auth(authUserInput);
  }
}
