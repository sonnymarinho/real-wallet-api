import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { JWT } from '../../config/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ProvidersModule } from 'src/providers/providers.module';

const JwtAuthModule = JwtModule.register({
  secret: JWT.SECRET,
  signOptions: { expiresIn: JWT.EXPIRES_IN },
});

@Module({
  imports: [UsersModule, JwtAuthModule, ProvidersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
