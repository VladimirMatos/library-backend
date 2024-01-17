import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { SignInDto, SignUpDto } from '@Auth/dto';
import { AuthService } from '@Auth/services';
import {
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserDoc } from '@User/docs';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Use it to login',
  })
  @ApiUnauthorizedResponse({ description: 'Bad credentials' })
  @ApiResponse({ description: 'Login' })
  @Post()
  signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }

  @ApiOperation({
    summary: 'Use it to create a new user',
  })
  @ApiBadRequestResponse({ description: 'Username or email already exist' })
  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ accessToken: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Get(':token')
  validate(@Param('token') token: string): Promise<UserDoc> {
    return this.authService.validate(token);
  }
}
