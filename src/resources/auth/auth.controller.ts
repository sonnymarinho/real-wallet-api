import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludePrefixes: ['_'] })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  auth(@Body() authUserDto: AuthUserDto) {
    return this.authService.auth(authUserDto);
  }
}
