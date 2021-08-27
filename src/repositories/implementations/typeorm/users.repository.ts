import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@resources/users/dto/create-user.dto';
import { UpdateUserDto } from '@resources/users/dto/update-user.dto';

import { AbstractUsersRepository } from '@repositories/abstract/abstract-users-repository';
import { UserEntity } from '@repositories/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository extends AbstractUsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly typeorm: Repository<UserEntity>,
  ) {
    super();
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const data = new UserEntity(dto);

    const user = await this.typeorm.create(data);

    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.typeorm.find();

    return users;
  }

  async findOne(id: UserEntity['id']): Promise<UserEntity> {
    const user = await this.typeorm.findOne({
      where: { id },
    });

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.typeorm.findOne({ where: { email } });

    return user;
  }

  async update(id: UserEntity['id'], dto: UpdateUserDto): Promise<UserEntity> {
    const data = { id, ...dto };

    const updatedUser = await this.typeorm.save({ ...data });

    return updatedUser;
  }

  async remove(id: UserEntity['id']): Promise<void> {
    await this.typeorm.delete(id);
  }
}
