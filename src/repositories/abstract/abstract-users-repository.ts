import { CreateUserDto } from '@root/resources/users/dto/create-user.dto';
import { UpdateUserDto } from '@root/resources/users/dto/update-user.dto';
import { IBaseRepository } from '../interface/base-repository';
import { UserEntity } from '../entities/users/user.entity';

export abstract class AbstractUsersRepository
  implements IBaseRepository<UserEntity>
{
  abstract create(dto: CreateUserDto): Promise<UserEntity>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract findOne(id: UserEntity['id']): Promise<UserEntity>;
  abstract findByEmail(email: UserEntity['email']): Promise<UserEntity>;
  abstract update(
    id: UserEntity['id'],
    dto: UpdateUserDto,
  ): Promise<UserEntity>;
  abstract remove(id: UserEntity['id']): Promise<void>;
}
