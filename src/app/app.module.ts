import { Module } from '@nestjs/common';
import { UsersModule } from '@resources/users/users.module';
import { AuthModule } from '@root/resources/auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
})
export class AppModule {}
