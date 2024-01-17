import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import mongoose from 'mongoose';

import { CreateTaskDto, UpdateTaskDto } from '@Task/dto';
import { Tasks } from '@Task/schemas';
import { TasksDoc } from '@Task/docs';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Tasks.name) private taskModule: mongoose.Model<Tasks>,
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<TasksDoc> {
    const taskDto = createTaskDto;

    const newTask = await this.taskModule.create(taskDto);

    const plainTask = plainToInstance(TasksDoc, newTask);

    return plainTask;
  }

  async findAll(): Promise<TasksDoc[]> {
    const tasks = await this.taskModule.find();

    const tasksPlain = plainToInstance(TasksDoc, tasks);

    return tasksPlain;
  }

  async findOne(id: string): Promise<TasksDoc> {
    const tasks = await this.taskModule.findById(id);

    if (!tasks) throw new NotFoundException('Task not found');

    const tasksPlain = plainToInstance(TasksDoc, tasks);

    return tasksPlain;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
