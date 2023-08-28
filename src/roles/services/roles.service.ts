import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Roles } from '@/rolesEntity/roles.entity';
import { RolesDoc } from '@/rolesDoc/roles.doc';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles) private rolesRepository: Repository<Roles>,
  ) {}

  async getAllRoles(): Promise<RolesDoc[]> {
    const roles = await this.rolesRepository.find();
    const rolesPlain = plainToInstance(RolesDoc, roles);
    return rolesPlain;
  }

  async getOneRoles(id: number): Promise<RolesDoc> {
    try {
      const roles = await this.rolesRepository.findOneOrFail({ where: { id } });
      const rolesPlain = plainToInstance(RolesDoc, roles);

      return rolesPlain;
    } catch (err) {
      throw new NotFoundException('Role not found');
    }
  }

  async createRoles() {
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

    const create = await this.rolesRepository.save(newRoles);

    return create;
  }
}
