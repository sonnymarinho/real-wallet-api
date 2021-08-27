import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Bcrypt } from '@providers/cryptography/implementations/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '@repositories/entities/user.entity';
import { UsersRepository } from '@repositories/implementations/typeorm/users.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly hash: Bcrypt,
    @InjectRepository(UserEntity)
    private readonly respository: Repository<UserEntity>,
  ) {}

  async create({ name, email, password }: CreateUserDto): Promise<UserEntity> {
    const existentUser = await this.findByEmail(email);

    const emailAlreadyInUse = !!existentUser;

    if (emailAlreadyInUse) {
      throw new UnprocessableEntityException('Email already in use.');
    }

    const hashedPassword = await this.hash.generateHash(password);

    const data = new UserEntity({
      name,
      email,
      password: hashedPassword,
    });

    console.log('user data: ', data);

    const user = await this.respository.save(data);

    return user;
  }

  findAll(): Promise<UserEntity[]> {
    return this.respository.find();
  }

  findOne(id: UserEntity['id']): Promise<UserEntity> {
    return this.respository.findOne(id);
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.respository.findOne({ where: { email } });
  }

  update(
    id: UserEntity['id'],
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.respository.save({ ...updateUserDto, id });
  }

  async remove(id: UserEntity['id']): Promise<void> {
    const existentUser = await this.findOne(id);
    const userDoesNotExists = !existentUser;

    if (userDoesNotExists) {
      throw new UnprocessableEntityException('User does not exists.');
    }

    this.respository.delete(id);
  }
}
