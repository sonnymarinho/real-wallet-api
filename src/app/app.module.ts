import { Module } from '@nestjs/common';
import { UsersModule } from '@resources/users/users.module';
import { AuthModule } from '@root/resources/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModuleConnection } from '@root/repositories/implementations/typeorm/typeorm-connection';

@Module({
  imports: [ConfigModule, UsersModule, AuthModule, TypeOrmModuleConnection],
})
export class AppModule {}
