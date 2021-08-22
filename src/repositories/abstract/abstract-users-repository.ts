import { User } from '@prisma/client';
import { UserEntity } from '@root/resources/users/entities/user.entity';
import { CreateUserDto } from '@root/resources/users/dto/create-user.dto';
import { UpdateUserDto } from '@root/resources/users/dto/update-user.dto';
import { IBaseRepository } from '../interface/base-repository';
import { plainToClass } from 'class-transformer';

export abstract class AbstractUsersRepository
  implements IBaseRepository<UserEntity>
{
  protected toEntity(user: User) {
    return plainToClass(UserEntity, user);
  }

  protected toEntityArray(users: User[]) {
    return users.map((user) => plainToClass(UserEntity, user));
  }

  abstract create(dto: CreateUserDto): Promise<UserEntity>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract findOne(id: User['id']): Promise<UserEntity>;
  abstract findByEmail(email: User['email']): Promise<UserEntity>;
  abstract update(id: User['id'], dto: UpdateUserDto): Promise<UserEntity>;
  abstract remove(id: User['id']): Promise<void>;
}
