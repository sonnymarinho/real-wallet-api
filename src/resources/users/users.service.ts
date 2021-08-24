import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Bcrypt } from '@providers/cryptography/implementations/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '@root/resources/users/entities/user.entity';
import { User } from '@prisma/client';
import { UsersRepository } from '@root/repositories/implementations/prisma/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly hash: Bcrypt,
    private readonly respository: UsersRepository,
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
