import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentVariables, Environment } from '../../../config/environment';
import { getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const TypeOrmConnectionModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const environment = configService.get<string>(
      EnvironmentVariables.NODE_ENV,
    );

    const isTesting = environment === Environment.Test;
    const connectionName = isTesting ? 'test' : 'default';

    return Object.assign(await getConnectionOptions(connectionName), {
      autoLoadEntities: true,
      keepConnectionAlive: true,
      namingStrategy: new SnakeNamingStrategy(),
    });
  },
});
