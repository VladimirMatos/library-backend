import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles) private rolesRepository: Repository<Roles>,
  ) {}

  getAllRoles(): Promise<Roles[]> {
    const roles = this.rolesRepository.find();

    return roles;
  }

  async getOneRoles(id: number): Promise<Roles | HttpException> {
    const roles = await this.rolesRepository.findOne({
      where: {
        id,
      },
    });

    if (!roles) {
      return new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return roles;
  }

  createRoles() {
    const rolesSeed = [
      {
        name: 'ADMIN',
      },
      {
        name: 'READER',
      },
      {
        name: 'Writer',
      },
    ];
    const newRoles = this.rolesRepository.create(rolesSeed);
    return this.rolesRepository.save(newRoles);
  }
}
