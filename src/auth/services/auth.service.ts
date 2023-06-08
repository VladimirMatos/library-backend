import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { validatorPassword } from 'src/helper/encrypt-password';
import { LocalAuthGuard } from '../utils/LocalGuard';
import { LoginDto } from '@/authDto/auth.dto';
import { UsersService } from '@/userService/users.service';
import { UserDoc } from '@/userDoc/user.doc';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  async login(
    email: LoginDto['email'],
    password: LoginDto['password'],
  ): Promise<UserDoc | HttpException> {
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

    const userPlain = plainToInstance(UserDoc, userFound);
    delete userPlain.password;
    return userPlain;
  }
}
