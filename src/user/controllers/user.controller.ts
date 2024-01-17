import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserDoc } from '@User/docs';
import { UpdateUserDto } from '@User/dto';
import { UserService } from '@User/services';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Use it to find all users',
  })
  @ApiResponse({
    description: 'This is all users found',
    type: [UserDoc],
    status: 200,
  })
  @Get()
  findAll(): Promise<UserDoc[]> {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'Use it to find a user by id',
  })
  @ApiNotFoundResponse({ description: 'User with this id nor found' })
  @ApiResponse({
    description: 'This is the user found',
    status: 200,
    type: UserDoc,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDoc> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
