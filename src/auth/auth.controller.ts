import {
  Request,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { LocalStrategy } from './utils/local.strategy';
import { LocalAuthGuard } from './utils/LocalGuard';

@Controller('auth')
export class AuthController {
  constructor(private authService: LocalStrategy) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req) {
    return req.user;
  }

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
  }
}
