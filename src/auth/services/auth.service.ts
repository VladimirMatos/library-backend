import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { validatorPassword } from 'helper/encrypt-password';
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

    if (userFound?.status) {
      return userFound;
    }

    const passValidator = await validatorPassword(password, userFound.password);

    if (!passValidator) {
      throw new BadRequestException('Wrong username or password.');
    }

    const userPlain = plainToInstance(UserDoc, userFound);
    delete userPlain.password;
    return userPlain;
  }
}
