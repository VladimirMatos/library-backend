import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encPassword } from 'src/helper/encrypt-password';
import { User } from '@/userEntity/user.entity';
import { RolesService } from '@/rolesService/roles.service';
import { CreateUserDto, UpdateUserDto } from '@/userDto/user.dto';
import { UserDoc } from '@/userDoc/user.doc';
import { plainToInstance } from 'class-transformer';
import { UserRepository } from '@/userRepository/user.repository';

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

  async createUser(user: CreateUserDto): Promise<UserDoc | HttpException> {
    const encPass = encPassword(user.password);
    const userObj = { ...user, password: encPass };
    await this.customRepository.findUserByEmail(user.email);

    const role: any = await this.roleService.getOneRoles(userObj.roleId);

    if (role.status == HttpStatus.NOT_FOUND) {
      return role;
    }

    const newUser = this.userRepository.create(userObj);
    newUser.role = role;

    const userCreated = this.userRepository.save(newUser);
    const userPlain = plainToInstance(UserDoc, userCreated);

    return userPlain;
  }

  async getOneUserById(id: number): Promise<UserDoc | HttpException> {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const userPlain = plainToInstance(UserDoc, userFound);
    return userPlain;
  }

  async getOneUserByEmail(email: string) {
    await this.customRepository.findUserByEmail(email);
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const userFound: any = await this.getOneUserById(id);

    if (userFound.status == HttpStatus.NOT_FOUND) {
      return userFound;
    }

    return this.userRepository.update({ id }, user);
  }
}
