import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { UserService } from '@User/services';
import { User } from '@User/schema';
import { SignInDto, SignUpDto } from '@Auth/dto';
import { ConfigService } from '@nestjs/config';
import { UserDoc } from '@User/docs';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const signIn = signInDto;
    const user = await this.usersService.findOneByEmail(signIn.email);

    const passValidate = await compare(signIn.password, user.password);

    if (!passValidate)
      throw new UnauthorizedException(
        ' There was a problem with logging you user. Please try again soon.',
      );

    const payload = { id: user._id };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async signUp(signUpDto: SignUpDto): Promise<{ accessToken: string }> {
    try {
      const { password, ...user } = signUpDto;

      const passwordHash = await hash(password, 10);

      const userFound = await this.userModel.findOne({ email: user.email });

      if (userFound)
        throw new BadRequestException(
          'You have a account with this email or username',
        );

      const newUser = await this.userModel.create({
        ...user,
        password: passwordHash,
      });

      const accessToken = this.jwtService.sign({ id: newUser._id });

      return { accessToken };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async validate(token: string): Promise<UserDoc> {
    const verified = this.jwtService.verify(
      token,
      this.configService.get('JWT_SECRET'),
    );

    console.log(verified);

    if (!verified)
      throw new UnauthorizedException(
        'There was a problem with logging you user. Please try again soon.',
      );

    const user = await this.userModel.findById(verified.id);

    if (!user) throw new NotFoundException('User not found');

    const userPlain = plainToInstance(UserDoc, user);

    return userPlain;
  }
}
