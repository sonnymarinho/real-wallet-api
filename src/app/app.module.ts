import { Module } from '@nestjs/common';
import { TypeOrmConnectionModule } from 'src/repositories/typeorm-connection';
import { UsersModule } from '../resources/users/users.module';

@Module({
  imports: [UsersModule, TypeOrmConnectionModule],
})
export class AppModule {}
