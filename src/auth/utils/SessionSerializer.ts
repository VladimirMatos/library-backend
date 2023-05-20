import { HttpException, Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(UsersService) private readonly userServices: UsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    done(null, user);
  }

  async deserializeUser(
    user: User,
    done: (err, user: User | HttpException) => void,
  ) {
    const userFound = await this.userServices.getOneUserById(user.id);
    return userFound ? done(null, userFound) : done(null, null);
  }
}
