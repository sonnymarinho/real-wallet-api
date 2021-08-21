import { PROVIDERS } from '@root/config/providers';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MongooseUserEntity,
  UserSchema,
} from '@root/entities/users/implementations/mongoose-user-entity';
import { MongooseUsersRepository } from './users';

const entitiesModel = [
  MongooseModule.forFeature([
    { name: MongooseUserEntity.name, schema: UserSchema },
  ]),
];
@Global()
@Module({
  imports: [...entitiesModel],
  providers: [],
  exports: [...entitiesModel],
})
export class MongooseRepositoryModule {}
