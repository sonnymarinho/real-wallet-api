import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '@resources/users/dto/create-user.dto';
import { UpdateUserDto } from '@resources/users/dto/update-user.dto';
import { User, UserDocument } from '@resources/users/entities/user.entity';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { AbstractUsersRepository } from '@repositories/users/abstract-users-repository';

@Injectable()
export class MongooseUsersRepository extends AbstractUsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super();
  }

  private toPlainClass(document: UserDocument): User {
    return plainToClass(User, document?.toObject());
  }

  async create(dto: CreateUserDto): Promise<User> {
    const userDocument = await this.userModel.create(dto);
    return this.toPlainClass(userDocument);
  }

  async findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(id: User['id']): Promise<User> {
    const userDocument = await this.userModel.findOne({ id });
    return this.toPlainClass(userDocument);
  }

  async findByEmail(email: string): Promise<User> {
    const userDocument = await this.userModel.findOne({ email });
    return this.toPlainClass(userDocument);
  }

  async update(id: User['id'], dto: UpdateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
  async remove(id: User['id']): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
