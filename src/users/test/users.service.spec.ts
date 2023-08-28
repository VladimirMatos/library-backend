import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@/userService/users.service';
import { RolesModule } from '@/rolesModule/roles.module';
import { UserRepository } from '@/userRepository/user.repository';
import { TyperOrmTestingModule } from 'database/data-source-test';
import { User } from '@/userEntity/user.entity';
import { Roles } from '@/rolesEntity/roles.entity';
import { BookRent } from '@/bookRentEntity/book-rent.entity';
import { Book } from '@/bookEntity/book.entity';
import { Category } from '@/categoryEntity/category.entity';
import { BookPage } from '@/bookPageEntity/book-page.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RolesModule,
        ...TyperOrmTestingModule([
          User,
          Roles,
          BookRent,
          Book,
          Category,
          BookPage,
        ]),
      ],
      providers: [
        UsersService,
        UserRepository,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn().mockImplementation((user) => user),
            save: jest.fn().mockImplementation((user) => user),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('find all user should be defined', async () => {
    const findAll = await service.getAllUser();
    expect(findAll).toBeDefined();
  });

  describe('createUser', () => {
    // it('Create user successfully', async () => {

    //   const createWithOurRoleId = await service.createUser({
    //     firstName: 'Vladi',
    //     lastName: 'Matos',
    //     email: 'test2@test.com',
    //     password: '123456',
    //     roleId: 1,
    //   });

    //   expect(createWithOurRoleId).toEqual({
    //     response: 'Already exist a user with this email, try with other email',
    //     status: 403,
    //   });

    it('create user using role not exist', async () => {
      const createWithOurRoleId = await service.createUser({
        firstName: 'Vladi',
        lastName: 'Matos',
        email: 'test',
        password: '123456',
        roleId: 5,
      });

      expect(createWithOurRoleId).toEqual({
        response: 'Role not found',
        status: 403,
      });
    });

    // it('create user using email already exist', async () => {
    //   const createWithUsedEmail = await service.createUser({
    //     firstName: 'Vladi',
    //     lastName: 'Matos',
    //     email: 'test@test.com',
    //     password: '123456',
    //     roleId: 1,
    //   });

    //   expect(createWithUsedEmail).toEqual({
    //     response: 'Already exist a user with this email, try with other email',
    //     status: 403,
    //   });
    // });
  });
});
// it('find all user should be return the UserDoc array if it find user', async () => {
//   const findAll = await service.getAllUser();
//   const plain = plainToInstance(UserDoc, findAll);

//   console.log(plain);

//   expect(findAll).toEqual([UserDoc]);
// });
