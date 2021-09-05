import { Module } from '@nestjs/common';
import { PROVIDER } from '../config/providers-name';
import { Bcrypt } from './criptography/implementation/bcrypt';

@Module({
  providers: [
    {
      provide: PROVIDER.HASH,
      useClass: Bcrypt,
    },
  ],
  exports: [PROVIDER.HASH],
})
export class ProvidersModule {}
