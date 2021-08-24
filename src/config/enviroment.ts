import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { IsEnum, IsNumber } from 'class-validator';

export const configService = new ConfigService();

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export enum EnviromentVariables {
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',
}

class EnvVariablesValidatorClass {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;
}

export function environmentValidation(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvVariablesValidatorClass, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
