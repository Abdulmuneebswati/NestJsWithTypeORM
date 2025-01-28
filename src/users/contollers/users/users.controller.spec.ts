import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../services/users/users.service';
import { createUserParams, updateUserParams } from '../../../types/types';
import { UserController } from './users.controller';

// Mock UsersService
const mockUsersService = {
  findUsers: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const result = [{ id: 1, username: 'Muneeb', password: '123456' }];
      mockUsersService.findUsers.mockResolvedValue(result);

      expect(await controller.getUsers()).toBe(result);
    });
  });

  describe('createUser', () => {
    it('should successfully create and return a user', async () => {
      const createUserDto: createUserParams = {
        username: 'Muneeb',
        password: '123456',
      };
      const createdUser = { id: 1, ...createUserDto };

      mockUsersService.createUser.mockResolvedValue(createdUser);

      expect(await controller.createUser(createUserDto)).toEqual(createdUser);
    });
  });

  describe('updateUser', () => {
    it('should successfully update and return the updated user', async () => {
      const id = 1;
      const userDetails: updateUserParams = {
        username: 'UpdatedMuneeb',
      };
      const updatedUser = { id, ...userDetails };

      mockUsersService.updateUser.mockResolvedValue(updatedUser);

      await controller.updateUser(id, userDetails);

      expect(mockUsersService.updateUser).toHaveBeenCalledWith(id, userDetails);
    });
  });

  describe('deleteUser', () => {
    it('should successfully delete a user', async () => {
      const id = 1;

      mockUsersService.deleteUser.mockResolvedValue({ affected: 1 });

      expect(await controller.deleteUser(id)).toEqual({ affected: 1 });
    });
  });
});
