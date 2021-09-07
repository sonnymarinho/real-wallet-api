import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../../resources/users/entities/user.entity';
import { CreateUserDto } from '../../../../resources/users/dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from 'src/resources/users/dto/update-user.dto';

describe('UsersRepository', () => {
  let repository: UsersRepository;

  const mockUsersRepository = {
    create: jest.fn((dto) =>
      Promise.resolve({
        id: uuidv4(),
        ...dto,
      }),
    ),
    findByEmail: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    save: jest.fn((data) => Promise.resolve(data)),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    repository = module.get<UsersRepository>(UsersRepository);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should be able to create a new user record and return that', async () => {
      const dto: CreateUserDto = {
        name: 'Jhon',
        password: '123',
        email: 'name@domain.com',
      };

      const user = await repository.create(dto);
      const repositoryCreateFunction = jest.spyOn(
        mockUsersRepository,
        'create',
      );
      const repositorySaveFunction = jest.spyOn(mockUsersRepository, 'save');

      expect(repositoryCreateFunction).toHaveBeenCalledWith(dto);
      expect(repositorySaveFunction).toBeCalled();
      expect(user).toEqual({ id: expect.any(String), ...dto });
      expect(user instanceof User).toBeTruthy();
    });

    it('should be able to create a unique id for each user', async () => {
      const dto: CreateUserDto = {
        name: 'Jhon',
        password: '123',
        email: 'name@domain.com',
      };

      const user1 = await repository.create(dto);
      const user2 = await repository.create(dto);

      const repositoryCreateFunction = jest.spyOn(
        mockUsersRepository,
        'create',
      );
      const repositorySaveFunction = jest.spyOn(mockUsersRepository, 'save');

      expect(repositoryCreateFunction).toHaveBeenCalledWith(dto);
      expect(repositoryCreateFunction).toHaveBeenCalledTimes(2);

      expect(repositorySaveFunction).toHaveBeenCalledTimes(2);

      expect(user1.id !== user2.id).toBeTruthy();
    });
  });

  describe('findAll', () => {
    it('should be able to return all users', async () => {
      const dto: CreateUserDto = {
        name: 'Jhon',
        password: '123',
        email: 'name@domain.com',
      };

      const user = new User(dto);
      const allUsers = [user, user, user];

      const findFunction = jest
        .spyOn(mockUsersRepository, 'find')
        .mockImplementation(() => Promise.resolve(allUsers));

      const allUsersResponse = await repository.findAll();

      expect(findFunction).toHaveBeenCalled();
      expect(allUsersResponse).toEqual(allUsers);
    });
  });

  describe('findOne', () => {
    it('should be able to find one user', async () => {
      const dto: CreateUserDto = {
        name: 'Jhon',
        password: '123',
        email: 'name@domain.com',
      };

      const user = await repository.create(dto);

      const findFunction = jest
        .spyOn(mockUsersRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(user));

      const findedUser = await repository.findById(user.id);

      expect(findFunction).toHaveBeenCalled();
      expect(findedUser).toEqual(user);
    });
  });

  describe('findByEmail', () => {
    it('should be able to find a user by email', async () => {
      const dto: CreateUserDto = {
        name: 'Jhon',
        password: '123',
        email: 'name@domain.com',
      };

      const user = await repository.create(dto);

      const findOneRepositoryFunction = jest
        .spyOn(mockUsersRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(user));

      const findedUser = await repository.findByEmail(user.email);

      expect(findedUser).toEqual(user);
      expect(findOneRepositoryFunction).toHaveBeenCalledWith({
        where: { email: dto.email },
      });
    });
  });

  describe('update', () => {
    it('should be able to update a user', async () => {
      const dto: CreateUserDto = {
        name: 'Jhon',
        password: '123',
        email: 'name@domain.com',
      };

      const user = await repository.create(dto);

      const updateDTO: UpdateUserDto = {
        ...dto,
        email: 'updated.name@domain.com',
      };

      await repository.update(user.id, updateDTO);

      const findOneRepositoryFunction = jest.spyOn(mockUsersRepository, 'save');

      expect(findOneRepositoryFunction).toHaveBeenCalledWith({
        id: user.id,
        ...updateDTO,
      });
    });
  });

  describe('remove', () => {
    it('should be able to remove a user', async () => {
      const dto: CreateUserDto = {
        name: 'Jhon',
        password: '123',
        email: 'name@domain.com',
      };

      const user = await repository.create(dto);

      const deleteRepositoryFunction = jest.spyOn(
        mockUsersRepository,
        'delete',
      );

      await repository.remove(user.id);

      expect(deleteRepositoryFunction).toHaveBeenCalledWith(user.id);
    });
  });
});
