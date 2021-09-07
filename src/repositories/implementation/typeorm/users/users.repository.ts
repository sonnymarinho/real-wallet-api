import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { plainToClass } from 'class-transformer';
import { User } from '../../../../resources/users/entities/user.entity';
import { CreateUserDto } from '../../../../resources/users/dto/create-user.dto';
import { UpdateUserDto } from '../../../../resources/users/dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly typeorm: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.typeorm.create(dto);

    await this.typeorm.save(user);

    return plainToClass(User, user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.typeorm.find();

    return users;
  }

  async findById(id: User['id']): Promise<User> {
    const user = await this.typeorm.findOne({
      where: { id },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.typeorm.findOne({ where: { email } });

    return user;
  }

  async update(id: User['id'], dto: UpdateUserDto): Promise<User> {
    const data = { id, ...dto };

    const updatedUser = await this.typeorm.save({ ...data });

    return updatedUser;
  }

  async remove(id: User['id']): Promise<void> {
    await this.typeorm.delete(id);
  }
}
