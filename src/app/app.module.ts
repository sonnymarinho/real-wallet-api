import { Module } from '@nestjs/common';
import { UsersModule } from '@resources/users/users.module';
import { AuthModule } from '@root/resources/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnviromentVariables, Environment } from '@root/config/enviroment';
import { createConnection } from 'typeorm';
import { UserEntity } from '@root/repositories/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    UsersModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(EnviromentVariables.DB_HOST),
        port: +configService.get<number>(EnviromentVariables.DB_PORT),
        username: configService.get(EnviromentVariables.DB_USERNAME),
        password: configService.get(EnviromentVariables.DB_PASSWORD),
        database: configService.get(EnviromentVariables.DB_DATABASE),
        entities: [UserEntity],
        synchronize:
          configService.get(EnviromentVariables.NODE_ENV) !==
          Environment.Production,
      }),
      inject: [ConfigService],
      connectionFactory: async (options) => {
        const connection = await createConnection(options);
        return connection;
      },
    }),
  ],
})
export class AppModule {}
