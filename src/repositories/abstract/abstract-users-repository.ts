import { CreateUserDto } from '@root/resources/users/dto/create-user.dto';
import { UpdateUserDto } from '@root/resources/users/dto/update-user.dto';
import { IUser } from '@entities/users/user-interface';
import { IBaseRepository } from '../interface/base-repository';

export abstract class AbstractUsersRepository
  implements IBaseRepository<IUser, IUser['id']>
{
  abstract create(dto: CreateUserDto): Promise<IUser>;
  abstract findAll(): Promise<IUser[]>;
  abstract findOne(id: IUser['id']): Promise<IUser>;
  abstract findByEmail(email: IUser['email']): Promise<IUser>;
  abstract update(id: IUser['id'], dto: UpdateUserDto): Promise<IUser>;
  abstract remove(id: IUser['id']): Promise<void>;
}
