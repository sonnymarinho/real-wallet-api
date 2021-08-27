import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnviromentVariables, Environment } from '@root/config/enviroment';
import { getConnectionOptions } from 'typeorm';

export const TypeOrmModuleConnection = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const environment = configService.get<string>(EnviromentVariables.NODE_ENV);

    const connectionName =
      environment === Environment.Test ? 'test' : 'default';

    return Object.assign(await getConnectionOptions(connectionName), {
      autoLoadEntities: true,
    });
  },
});
