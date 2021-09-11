import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import {
  ClassSerializerInterceptor,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-users.input';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludePrefixes: ['_'] })
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') input: CreateUserInput) {
    return this.usersService.create(input);
  }

  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: User['id']) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') input: UpdateUserInput) {
    return this.usersService.update(input.id, input);
  }

  @Mutation(() => User)
  deleteUser(@Args('id', { type: () => String }) id: User['id']) {
    return this.usersService.remove(id);
  }
}
