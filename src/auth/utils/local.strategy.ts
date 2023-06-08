import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '@/authService/auth.service';
import { LoginDto } from '@/authDto/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: LoginDto['email'],
    password: LoginDto['password'],
  ): Promise<any> {
    const userLogin: any = await this.authService.login(email, password);

    if (userLogin.status == 404 || userLogin.status == 403) {
      return userLogin;
    }

    return userLogin;
  }
}
