import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PROVIDERS } from '@config/providers';
import { Bcrypt } from '@providers/cryptography/implementations/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from '@root/repositories/implementations/users';
import { UserEntity } from '@root/entities/users/user.entity';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PROVIDERS.HASH) private hash: Bcrypt,
    private respository: UsersRepository,
  ) {}

  async create({ name, email, password }: CreateUserDto): Promise<UserEntity> {
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

  findAll(): Promise<UserEntity[]> {
    return this.respository.findAll();
  }

  findOne(id: User['id']): Promise<UserEntity> {
    return this.respository.findOne(id);
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.respository.findByEmail(email);
  }

  update(id: User['id'], updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.respository.update(id, updateUserDto);
  }

  async remove(id: User['id']): Promise<void> {
    const existentUser = await this.findOne(id);
    const userDoesNotExists = !existentUser;

    if (userDoesNotExists) {
      throw new UnprocessableEntityException('User does not exists.');
    }

    return this.respository.remove(id);
  }
}
