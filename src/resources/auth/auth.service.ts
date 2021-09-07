import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PROVIDER } from '../../config/providers-name';
import { IHashProvider } from '../../providers/criptography/abstract-hash.provider';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UserAuthDTO } from './dto/user-auth.dto';
import { PayloadObject } from './type/payload-object';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(PROVIDER.HASH)
    private hash: IHashProvider,
  ) {}

  private generateToken(user: User): string {
    const payload: PayloadObject = { email: user.email, id: user.id };
    return this.jwtService.sign(payload);
  }

  async auth(authUserDto: UserAuthDTO) {
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
