import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/userEntity/user.entity';
import { Repository } from 'typeorm';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUserByEmailRepeted(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (user) {
      throw new ForbiddenException(
        'Already exist a user with this email, try with other email',
      );
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: {
          email,
        },
      });

      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
