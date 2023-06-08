import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../utils/LocalGuard';
import { LoginDto } from '@/authDto/auth.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDoc } from '@/userDoc/user.doc';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @ApiOkResponse({
    description: 'User login',
    type: UserDoc,
  })
  @ApiBadRequestResponse({
    description: 'Error in credentials',
  })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Body() user: LoginDto) {
    return {
      user: user.email,
      message: 'Login',
    };
  }
}
