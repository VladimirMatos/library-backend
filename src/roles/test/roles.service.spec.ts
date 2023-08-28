import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from '@/rolesService/roles.service';
import { Roles } from '@/rolesEntity/roles.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { RolesDoc } from '@/rolesDoc/roles.doc';

describe('RolesService', () => {
  let service: RolesService;
  let rolesRepository: Repository<Roles>;
  const rolesPlain = plainToClass(RolesDoc, { id: 1, name: 'ADMIN' });
  const ROLES_REPOSITORY_TOKEN = getRepositoryToken(Roles);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: ROLES_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn().mockImplementation((roles) => roles),
            save: jest.fn().mockImplementation((roles) => roles),
            findOne: jest.fn((id) => {
              return rolesPlain;
            }),
            findOneOrFail: jest.fn(({ where: { id } }) =>
              Promise.resolve(rolesPlain),
            ),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    rolesRepository = module.get<Repository<Roles>>(ROLES_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('RolesRepository should be defined', () => {
    expect(rolesRepository).toBeDefined();
  });

  it('Create roles', async () => {
    const roles = await service.createRoles();

    expect(rolesRepository.create).toHaveBeenCalledTimes(1);
    expect(rolesRepository.create).toHaveBeenCalledWith([
      {
        name: 'ADMIN',
      },
      { name: 'READER' },
      { name: 'Writer' },
    ]);
    expect(rolesRepository.save).toHaveBeenCalledTimes(1);
    expect(rolesRepository.save).toHaveBeenCalledWith([
      {
        name: 'ADMIN',
      },
      { name: 'READER' },
      { name: 'Writer' },
    ]);

    expect(roles).toEqual([
      {
        name: 'ADMIN',
      },
      { name: 'READER' },
      { name: 'Writer' },
    ]);
  });

  it('Get all roles whitour roles saves', async () => {
    jest.spyOn(rolesRepository, 'find').mockResolvedValueOnce([]);
    const findAll = await service.getAllRoles();
    expect(findAll).toEqual([]);
    expect(rolesRepository.find).toHaveBeenCalledTimes(1);
  });

  it('Get one role and not found', async () => {
    jest
      .spyOn(rolesRepository, 'findOneOrFail')
      .mockRejectedValue(new NotFoundException());
    await expect(service.getOneRoles(5)).rejects.toThrow();
    expect(rolesRepository.findOneOrFail).toHaveBeenCalledTimes(1);
    expect(rolesRepository.findOneOrFail).toHaveBeenCalledWith({
      where: { id: 5 },
    });
  });

  it('Get one user and not found', async () => {
    const findOne = await service.getOneRoles(1);

    expect(rolesRepository.findOneOrFail).toHaveBeenCalledTimes(1);
    expect(rolesRepository.findOneOrFail).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(findOne).toEqual({
      name: 'ADMIN',
      id: 1,
    });
  });
});
