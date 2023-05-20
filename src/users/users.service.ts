import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

import { encPassword } from 'src/helper/encrypt-password';

import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private roleService: RolesService,
  ) {}

  getAllUser(): Promise<User[]> {
    return this.userRepository.find({
      relations: {
        role: true,
        bookRents: {
          book: true,
        },
      },
    });
  }

  async createUser(user: CreateUserDto): Promise<User | HttpException> {
    const encPass = encPassword(user.password);
    const userObj = { ...user, password: encPass };
    const userFind = await this.userRepository.findOne({
      where: {
        email: userObj.email,
      },
    });

    if (userFind) {
      return new HttpException('User already exist', HttpStatus.CONFLICT);
    }
    const role: any = await this.roleService.getOneRoles(userObj.roleId);

    if (role.status == HttpStatus.NOT_FOUND) {
      return role;
    }

    const newUser = this.userRepository.create(userObj);
    newUser.role = role;

    return this.userRepository.save(newUser);
  }

  async getOneUserById(id: number): Promise<User | HttpException> {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  async getOneUserByEmail(email: string): Promise<User | HttpException> {
    const userFound = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  async deleteUser(id: number) {
    const userFound: any = await this.getOneUserById(id);

    if (userFound.status == HttpStatus.NOT_FOUND) {
      return userFound;
    }

    return this.userRepository.delete(id);
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const userFound: any = await this.getOneUserById(id);

    if (userFound.status == HttpStatus.NOT_FOUND) {
      return userFound;
    }

    return this.userRepository.update({ id }, user);
  }
}
