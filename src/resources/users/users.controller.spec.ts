import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUserService = {
    create: jest.fn((dto: CreateUserDto) => ({
      id: uuidv4(),
      ...dto,
    })),

    update: jest.fn((id, dto) => ({
      id,
      ...dto,
    })),

    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', async () => {
    expect(UsersController).toBeDefined();
  });

  describe('create', () => {
    it('should be able to create a new user', async () => {
      const data = { name: 'Jhon', password: '123', email: 'name@domain.com' };

      const user = await controller.create(data);

      expect(mockUserService.create).toBeCalledWith(data);
      expect(user).toEqual({
        id: expect.any(String),
        ...user,
      });
    });
  });

  describe('update', () => {
    it('should be able to update a user', async () => {
      const data = { name: 'Jhon', password: '123' };

      expect(controller.update('123', data)).toEqual({
        id: expect.any(String),
        ...data,
      });
    });
  });

  describe('delete', () => {
    it('should be able to delete a user', async () => {
      const data = { id: 'a123', name: 'Jhon', password: '123' };

      controller.remove(data.id);

      expect(mockUserService.remove).toBeCalledWith(data.id);
    });
  });
});
