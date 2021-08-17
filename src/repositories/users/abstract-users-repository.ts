import { CreateUserDto } from '@root/resources/users/dto/create-user.dto';
import { UpdateUserDto } from '@root/resources/users/dto/update-user.dto';
import { User } from '@root/resources/users/entities/user.entity';
import { IBaseRepository } from '../interface/base-repository';

export abstract class AbstractUsersRepository implements IBaseRepository<User> {
  abstract create(dto: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: User['id']): Promise<User>;
  abstract findByEmail(email: User['email']): Promise<User>;
  abstract update(id: User['id'], dto: UpdateUserDto): Promise<User>;
  abstract remove(id: User['id']): Promise<void>;
}
