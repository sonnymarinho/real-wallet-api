import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { JWT } from '../../config/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ProvidersModule } from '../../providers/providers.module';

const JwtAuthModule = JwtModule.register({
  secret: JWT.SECRET,
  signOptions: { expiresIn: JWT.EXPIRES_IN },
});

@Module({
  imports: [UsersModule, JwtAuthModule, ProvidersModule],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
