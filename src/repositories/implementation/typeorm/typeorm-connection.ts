import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnviromentVariables, Environment } from '../../../config/environment';
import { getConnectionOptions } from 'typeorm';

export const TypeOrmConnectionModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const environment = configService.get<string>(EnviromentVariables.NODE_ENV);

    const isTesting = environment === Environment.Test;
    const connectionName = isTesting ? 'test' : 'default';

    return Object.assign(await getConnectionOptions(connectionName), {
      autoLoadEntities: true,
      keepConnectionAlive: true,
    });
  },
});
