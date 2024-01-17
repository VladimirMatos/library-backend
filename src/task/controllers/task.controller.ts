import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TasksDoc } from '@Task/docs';

import { CreateTaskDto, UpdateTaskDto } from '@Task/dto';
import { TaskService } from '@Task/services';

@ApiTags('Tasks')
// @ApiSecurity('JWT-auth')
// @UseGuards(AuthGuard())
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({
    summary: 'Use it to create a new user task',
  })
  @ApiUnauthorizedResponse({
    description: 'You need to be logged for used this path',
  })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req): Promise<TasksDoc> {
    const newTask = Object.assign(createTaskDto, { user: req.user._id });
    return this.taskService.create(newTask);
  }

  @ApiOperation({
    summary: 'Use it to get all user task',
  })
  @ApiResponse({ type: [TasksDoc], status: 200 })
  @Get()
  findAll(): Promise<TasksDoc[]> {
    return this.taskService.findAll();
  }

  @ApiOperation({
    summary: 'Use it to get all user task',
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<TasksDoc> {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
