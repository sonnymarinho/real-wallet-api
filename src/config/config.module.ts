import { DynamicModule, Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigModuleOptions,
} from '@nestjs/config';
import { ConfigService } from './config.service';
import { PROVIDERS } from './providers';
import { environmentValidation } from './enviroment';

@Module({
  imports: [
    NestConfigModule.forRoot({ environmentValidation } as ConfigModuleOptions),
  ],
})
export class ConfigModule {
  static register(options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: PROVIDERS.CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
