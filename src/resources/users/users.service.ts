import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from '../../repositories/implementation/typeorm/users/users.repository';
import { PROVIDER } from '../../config/providers-name';
import { AbstractHashProvider } from '../../providers/criptography/abstract-hash.provider';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PROVIDER.USERS.REPOSITORY)
    private readonly repository: UsersRepository,
    @Inject(PROVIDER.HASH) private readonly hash: AbstractHashProvider,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, email } = createUserDto;

    const existentUser = await this.repository.findByEmail(email);

    if (existentUser) {
      throw new UnprocessableEntityException('Email is already in use');
    }

    const hashedPassword = await this.hash.generateHash(password);

    const data: CreateUserDto = {
      ...createUserDto,
      password: hashedPassword,
    };

    return this.repository.create(data);
  }

  update(id: User['id'], updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  remove(id: User['id']) {
    return this.repository.remove(id);
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findByEmail(email);
  }
}
