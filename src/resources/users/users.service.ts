import {
  Inject,
  Injectable,
  NotImplementedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AbstractUsersRepository } from '@repositories/users/abstract-users-repository';
import { Providers } from '@root/config/providers';
import { Bcrypt } from '@root/providers/cryptography/implementations/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(Providers.Hash) private hash: Bcrypt,
    @Inject(Providers.UsersRepository)
    private respository: AbstractUsersRepository,
  ) {}

  async create({ name, email, password }: CreateUserDto): Promise<User> {
    const existentUser = await this.findByEmail(email);

    const emailAlreadyInUse = !!existentUser;

    if (emailAlreadyInUse) {
      throw new UnprocessableEntityException('Email already in use.');
    }

    const hashedPassword = await this.hash.generateHash(password);

    const user = await this.respository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }

  findAll() {
    throw new NotImplementedException('Method not implemented: findAll');
  }

  findOne(id: number): User {
    throw new NotImplementedException('Method not implemented: findOne');
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.respository.findByEmail(email);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    throw new NotImplementedException('Method not implemented: update');
  }

  remove(id: number) {
    throw new NotImplementedException('Method not implemented: remove');
  }
}
