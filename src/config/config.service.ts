import { Inject, Injectable } from '@nestjs/common';
import path from 'path';
import { EnviromentVariables } from './enviroment';
import { PROVIDERS } from './providers';
import * as fs from 'fs';
import dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly envConfig;

  constructor(@Inject(PROVIDERS.CONFIG_OPTIONS) private readonly options) {
    const filePath = '.env';
    const envFile = path.resolve(__dirname, '../../', filePath);
    this.envConfig = dotenv.parse(fs.readFileSync('../../.env'));
  }

  get(key: EnviromentVariables): string {
    return this.envConfig[key];
  }
}
