import { Module } from '@nestjs/common';
import { UsersModule } from '@/userModule/users.module';
import { SessionSerializer } from './utils/SessionSerializer';
import { LocalStrategy } from './utils/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '@/authService/auth.service';
import { AuthController } from '@/authController/auth.controller';

@Module({
  providers: [AuthService, SessionSerializer, LocalStrategy],
  controllers: [AuthController],
  imports: [UsersModule, AuthModule, PassportModule],
})
export class AuthModule {}
