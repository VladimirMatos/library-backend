import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encPassword } from 'helper/encrypt-password';
import { User } from '@/userEntity/user.entity';
import { RolesService } from '@/rolesService/roles.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UploadImageDto,
} from '@/userDto/user.dto';
import { UserDoc } from '@/userDoc/user.doc';
import { plainToInstance } from 'class-transformer';
import { UserRepository } from '@/userRepository/user.repository';
import { uploadImage } from 'helper/upload';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private roleService: RolesService,
    private customRepository: UserRepository,
  ) {}

  async getAllUser(): Promise<UserDoc[]> {
    const userFind = await this.userRepository.find({
      relations: {
        role: true,
        bookRents: {
          book: true,
        },
      },
    });

    const user = plainToInstance(UserDoc, userFind);

    return user;
  }

  async createUser(user: CreateUserDto): Promise<UserDoc> {
    const encPass = encPassword(user.password);

    const userObj = { ...user, password: encPass };

    await this.customRepository.findUserByEmailRepeted(user.email);

    const role = await this.roleService.getOneRoles(userObj.roleId);

    const newUser = this.userRepository.create(userObj);
    newUser.role = role;

    const userCreated = this.userRepository.save(newUser);
    const userPlain = plainToInstance(UserDoc, userCreated);

    return userPlain;
  }

  async getOneUserById(id: number): Promise<UserDoc> {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    const userPlain = plainToInstance(UserDoc, userFound);
    return userPlain;
  }

  async getOneUserByEmail(email: string) {
    const user = await this.customRepository.findUserByEmail(email);

    return user;
  }

  async updateUser(id: number, user: UpdateUserDto) {
    await this.getOneUserById(id);

    return this.userRepository.update({ id }, user);
  }

  async uploadImage(image: UploadImageDto) {
    const url = await uploadImage({ ...image, file: 'user' });
    await this.updateUser(image.id, { imageUrl: url });
    return {
      imageUrl: url,
    };
  }
}
