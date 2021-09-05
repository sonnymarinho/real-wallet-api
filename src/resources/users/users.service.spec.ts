import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UnprocessableEntityException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    create: jest.fn((dto: CreateUserDto) => Promise.resolve(new User(dto))),
    findOne: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn((id, data) => ({ ...data, id })),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'UsersRepository',
          useValue: mockUsersRepository,
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
    it('should be abre to create a new user record and return that', async () => {
      const data: CreateUserDto = {
        name: 'Jhon',
        password: '123',
        email: 'name@domain.com',
      };

      expect(await service.create(data)).toEqual({
        id: expect.any(String),
        ...data,
      });
    });

    it('not sould be able to crea a user with an existing email', async () => {
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
    it('should be abre to update a new user record and return that', async () => {
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
    it('should be abre to delete a user', async () => {
      const userId = 'uuidv4-id';

      const removeUserFunction = jest.spyOn(mockUsersRepository, 'remove');

      await service.remove(userId);

      expect(removeUserFunction).toHaveBeenCalledWith(userId);
    });
  });
});
