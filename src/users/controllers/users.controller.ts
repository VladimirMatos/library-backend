import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '@/userService/users.service';
import { CreateUserDto, UpdateUserDto } from '@/userDto/user.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDoc } from '@/userDoc/user.doc';
import { AuthenticateGuard } from '@/authModule/utils/LocalGuard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOkResponse({
    description: 'User found',
    type: [UserDoc],
  })
  @ApiBadRequestResponse({
    description: 'User not found',
  })
  @Get()
  getAllUser(): Promise<UserDoc[]> {
    return this.userService.getAllUser();
  }

  @ApiOkResponse({
    description: 'User created',
    type: UserDoc,
  })
  @ApiConflictResponse({
    description: 'User cannot be created',
  })
  @Post()
  createUser(@Body() user: CreateUserDto): Promise<
    | UserDoc
    | {
        response: string;
        status: number;
      }
  > {
    return this.userService.createUser(user);
  }

  @ApiOkResponse({
    description: 'User found',
    type: UserDoc,
  })
  @ApiBadRequestResponse({
    description: 'User not found',
  })
  // @UseGuards(AuthenticateGuard)
  @Get(':id')
  getOneUse(@Param('id') id: number): Promise<UserDoc | HttpException> {
    return this.userService.getOneUserById(id);
  }

  @ApiOkResponse({
    description: 'User updated',
  })
  @ApiBadRequestResponse({
    description: 'User cannot be updated',
  })
  // @UseGuards(AuthenticateGuard)
  @ApiOkResponse()
  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }
}
