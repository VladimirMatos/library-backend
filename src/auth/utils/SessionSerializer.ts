import { HttpException, Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserDoc } from '@/userDoc/user.doc';
import { User } from '@/userEntity/user.entity';
import { UsersService } from '@/userService/users.service';

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
    done: (err, user: UserDoc | HttpException) => void,
  ) {
    const userFound = await this.userServices.getOneUserById(user.id);

    return userFound ? done(null, userFound) : done(null, null);
  }
}
