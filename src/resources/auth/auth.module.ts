import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Bcrypt } from '@root/providers/cryptography/implementations/bcrypt';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { JWT } from '@root/config/jwt';
import { JwtStrategy } from './strategy/jwt-strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: JWT.SECRET,
      signOptions: { expiresIn: JWT.EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, Bcrypt],
})
export class AuthModule {}
