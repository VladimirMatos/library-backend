import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { AuthenticateGuard } from 'src/auth/utils/LocalGuard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUser(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @Post()
  createUser(@Body() user: CreateUserDto): Promise<User | HttpException> {
    return this.userService.createUser(user);
  }

  @UseGuards(AuthenticateGuard)
  @Get(':id')
  getOneUse(@Param('id') id: number): Promise<User | HttpException> {
    return this.userService.getOneUserById(id);
  }

  @UseGuards(AuthenticateGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @UseGuards(AuthenticateGuard)
  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }
}
