import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '@resources/users/dto/create-user.dto';
import { UpdateUserDto } from '@resources/users/dto/update-user.dto';
import {
  MongooseUserEntity,
  UserDocument,
} from '@entities/users/implementations/mongoose-user-entity';
import { Model } from 'mongoose';
import { AbstractUsersRepository } from '@repositories/abstract/abstract-users-repository';
import { CommonUserEntity } from '@root/entities/users/common-user-entity';
import { IUser } from '@root/entities/users/user-interface';

@Injectable()
export class MongooseUsersRepository extends AbstractUsersRepository {
  constructor(
    @InjectModel(MongooseUserEntity.name)
    private userModel: Model<UserDocument>,
  ) {
    super();
  }

  private parseToCommonUserEntity(document: UserDocument): CommonUserEntity {
    let commonEntity: CommonUserEntity;

    if (document) {
      const { _id, name, email, password } = document;

      commonEntity = {
        id: _id,
        name,
        email,
        password,
      };
    }

    return commonEntity;
  }

  async create(dto: CreateUserDto): Promise<CommonUserEntity> {
    const userDocument = await this.userModel.create(dto);
    const res = await userDocument.save();

    return this.parseToCommonUserEntity(userDocument);
  }

  async findAll(): Promise<CommonUserEntity[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(id: IUser['id']): Promise<CommonUserEntity> {
    const userDocument = await this.userModel.findOne({ id });
    return this.parseToCommonUserEntity(userDocument);
  }

  async findByEmail(email: string): Promise<CommonUserEntity> {
    const userDocument = await this.userModel.findOne({ email });
    return this.parseToCommonUserEntity(userDocument);
  }

  async update(id: IUser['id'], dto: UpdateUserDto): Promise<CommonUserEntity> {
    throw new Error('Method not implemented.');
  }
  async remove(id: IUser['id']): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
