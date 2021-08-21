import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Bcrypt } from '@root/providers/cryptography/implementations/bcrypt';
import { CommonUserEntity } from '@entities/users/common-user-entity';
import { UsersService } from '../users/users.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { PayloadObject } from './type/palyload-object';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject('HASH_PROVIDER') private hash: Bcrypt,
  ) {}

  private generateToken(user: CommonUserEntity): string {
    const payload: PayloadObject = { email: user.email, id: user.id };
    return this.jwtService.sign(payload);
  }

  async auth(authUserDto: AuthUserDto) {
    const { email, password } = authUserDto;

    const user = await this.usersService.findByEmail(email);

    const userDoesNotExists = !user;

    if (userDoesNotExists) {
      throw new BadRequestException(
        'Verify your email or password and try again',
      );
    }

    const { password: hash } = user;

    const passwordsMatch = await this.hash.compareHash({
      hash,
      password,
    });

    if (passwordsMatch) {
      const access_token = this.generateToken(user);

      return { user, access_token };
    }

    throw new UnauthorizedException('Invalid email or password');
  }
}
