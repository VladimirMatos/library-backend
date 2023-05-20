import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { SessionSerializer } from './utils/SessionSerializer';
import { LocalStrategy } from './utils/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [AuthService, SessionSerializer, LocalStrategy],
  controllers: [AuthController],
  imports: [UsersModule, AuthModule, PassportModule],
})
export class AuthModule {}
