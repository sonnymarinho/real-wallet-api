import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@resources/users/dto/create-user.dto';
import { UpdateUserDto } from '@resources/users/dto/update-user.dto';

import { AbstractUsersRepository } from '@repositories/abstract/abstract-users-repository';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from '@root/resources/users/entities/user.entity';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersRepository extends AbstractUsersRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const data: Prisma.UserCreateInput = { ...dto };

    const user = await this.prisma.user.create({ data });

    return this.toEntity(user);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();

    return this.toEntityArray(users);
  }

  async findOne(id: User['id']): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return this.toEntity(user);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    return this.toEntity(user);
  }

  async update(id: User['id'], dto: UpdateUserDto): Promise<UserEntity> {
    const data: Prisma.UserUpdateInput = { ...dto };

    const updatedUser = await this.prisma.user.update({ where: { id }, data });

    return this.toEntity(updatedUser);
  }

  async remove(id: User['id']): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
