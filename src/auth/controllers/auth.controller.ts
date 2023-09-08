import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../utils/LocalGuard';
import { LoginDto } from '@/authDto/auth.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDoc } from '@/userDoc/user.doc';
import { AuthService } from '@/authService/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOkResponse({
    description: 'User login',
    type: UserDoc,
  })
  @ApiBadRequestResponse({
    description: 'Error in credentials',
  })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() user: LoginDto) {
    const login = await this.authService.login(user.email, user.password);

    return {
      user: login,
      message: 'Login',
    };
  }
}
