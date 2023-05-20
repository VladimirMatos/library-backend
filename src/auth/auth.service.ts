import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './auth.dto';
import { validatorPassword } from 'src/helper/encrypt-password';
import { User } from 'src/users/user.entity';
import { LocalAuthGuard } from './utils/LocalGuard';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  async login(
    email: LoginDto['email'],
    password: LoginDto['password'],
  ): Promise<User | HttpException> {
    const userFound: any = await this.userService.getOneUserByEmail(email);
    if (userFound.status == HttpStatus.NOT_FOUND) {
      return userFound;
    }
    const passValidator = await validatorPassword(password, userFound.password);

    if (!passValidator) {
      return new HttpException(
        'Wrong username or password.',
        HttpStatus.FORBIDDEN,
      );
    }

    delete userFound.password;
    return userFound;
  }
}
