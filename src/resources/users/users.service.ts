import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from '../../repositories/implementation/typeorm/users/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository') private readonly repository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existentUser = await this.repository.findByEmail(createUserDto.email);

    if (existentUser) {
      throw new UnprocessableEntityException('Email is already in use');
    }

    return this.repository.create(createUserDto);
  }

  update(id: User['id'], updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  remove(id: User['id']) {
    return this.repository.remove(id);
  }
}
