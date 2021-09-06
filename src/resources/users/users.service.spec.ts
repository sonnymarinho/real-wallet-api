import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UnprocessableEntityException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PROVIDER } from '../../config/providers-name';
import { IHashProvider } from 'src/providers/criptography/abstract-hash.provider';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    create: jest.fn((dto: CreateUserDto) => Promise.resolve(new User(dto))),
    findOne: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn((id, data) => ({ ...data, id })),
    remove: jest.fn(),
  };

  const mockHashProvider: IHashProvider = {
    generateHash: jest.fn((text: string) => Promise.resolve(text + 'hashed')),
    compareHash: jest.fn(({ password }) =>
      Promise.resolve(password.endsWith('hashed')),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PROVIDER.USER.REPOSITORY,
          useValue: mockUsersRepository,
        },
        {
          provide: PROVIDER.HASH,
          useValue: mockHashProvider,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('new User', () => {
    it('should be able to create a new user object instance from the class', () => {
      const data: User = {
        name: 'Jhon',
        email: 'name@domain.com',
        password: '1234',
      };

      const user = new User(data);

      expect(user.id).toBeTruthy();
    });

    it('should be able to create a new empty user', () => {
      const user = new User();

      expect(user.id).toBeTruthy();
    });
  });

  describe('create', () => {
    it('should be able to create a new user record and return that', async () => {
      const data: CreateUserDto = {
        name: 'Jhon',
        password: '123',
        email: 'name@domain.com',
      };

      const hashedPassword = await mockHashProvider.generateHash(data.password);

      expect(await service.create(data)).toEqual({
        id: expect.any(String),
        ...data,
        password: hashedPassword,
      });
    });

    it('should be able to hash the password user', async () => {
      const data: CreateUserDto = {
        name: 'Jhon',
        password: '123',
        email: 'name@domain.com',
      };

      const generateHashFunction = jest.spyOn(mockHashProvider, 'generateHash');

      const createdUser = await service.create(data);
      const hashedPassword = await mockHashProvider.generateHash(data.password);

      expect(createdUser.password === hashedPassword).toBeTruthy();
      expect(generateHashFunction).toBeCalledWith(data.password);
    });

    it('should not be able to create a user with an existing email', async () => {
      const dto: CreateUserDto = {
        name: 'Jhon Wick',
        email: 'jhon@domain.com',
        password: '123',
      };

      const user1 = await service.create(dto);

      const spyFindUserExistent = await jest
        .spyOn(mockUsersRepository, 'findByEmail')
        .mockImplementation(() => user1);

      expect(spyFindUserExistent).toBeCalled();
      expect(mockUsersRepository.findByEmail).toBeCalledWith(dto.email);

      await expect(service.create(dto)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });
  });

  describe('update', () => {
    it('should be able to update a new user record and return that', async () => {
      const data = new UpdateUserDto({
        name: 'Jhon',
        password: '123',
        email: 'name@domain.com',
      });

      await expect(await service.update('uuidv4-id', data)).toEqual({
        id: expect.any(String),
        ...data,
      });
    });
  });

  describe('delete', () => {
    it('should be able to delete a user', async () => {
      const userId = 'uuidv4-id';

      const removeUserFunction = jest.spyOn(mockUsersRepository, 'remove');

      await service.remove(userId);

      expect(removeUserFunction).toHaveBeenCalledWith(userId);
    });
  });
});
