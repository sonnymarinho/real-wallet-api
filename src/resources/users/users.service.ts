import {
  Inject,
  Injectable,
  NotImplementedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AbstractUsersRepository } from '@repositories/abstract/abstract-users-repository';
import { PROVIDERS } from '@config/providers';
import { IUser } from '@entities/users/user-interface';
import { Bcrypt } from '@providers/cryptography/implementations/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PROVIDERS.HASH) private hash: Bcrypt,
    @Inject(PROVIDERS.USER.REPOSITORY)
    private respository: AbstractUsersRepository,
  ) {}

  async create({ name, email, password }: CreateUserDto): Promise<IUser> {
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

  findOne(id: number): IUser {
    throw new NotImplementedException('Method not implemented: findOne');
  }

  async findByEmail(email: string): Promise<IUser> {
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
