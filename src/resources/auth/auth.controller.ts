import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDTO } from './dto/user-auth.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludePrefixes: ['_'] })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  auth(@Body() authUserDto: UserAuthDTO) {
    return this.authService.auth(authUserDto);
  }
}
