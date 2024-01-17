import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { UserDoc, UserWithPassDoc } from '@User/docs';
import { UpdateUserDto } from '@User/dto';
import { User } from '@User/schema';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}

  async findAll(): Promise<UserDoc[]> {
    const users = await this.userModel.find();

    const userPlain = plainToInstance(UserDoc, users);
    return userPlain;
  }

  async findOne(id: string): Promise<UserDoc> {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found');

    const userPlain = plainToInstance(UserDoc, user);

    return userPlain;
  }

  async findOneByEmail(email: string): Promise<UserWithPassDoc> {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new NotFoundException('User not found');

    const userPlain = plainToInstance(UserWithPassDoc, user);

    return userPlain;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
