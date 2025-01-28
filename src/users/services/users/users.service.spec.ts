import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createUserParams, updateUserParams } from 'src/types/types';
import { User } from '../../../typeorm/entities/User';

describe('UsersService', () => {
  let service: UsersService;

  // Mocked UserRepository
  const mockUserRepository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUsers', () => {
    it('should return an array of users', async () => {
      const result = [{ id: 1, username: 'Muneeb', password: '123456' }];
      mockUserRepository.find.mockResolvedValue(result);

      expect(await service.findUsers()).toBe(result);
    });
  });

  describe('createUser', () => {
    it('should successfully create and return a user', async () => {
      const userDetails: createUserParams = {
        username: 'Muneeb',
        password: '123456',
      };
      const createdUser = { id: 1, ...userDetails };

      mockUserRepository.create.mockReturnValue(createdUser);
      mockUserRepository.save.mockResolvedValue(createdUser);

      expect(await service.createUser(userDetails)).toEqual(createdUser);
    });
  });

  describe('updateUser', () => {
    it('should return nothing if no user is found to update', async () => {
      const id = 1;
      const updateDetails: updateUserParams = {
        username: 'UpdatedMuneeb',
      };

      mockUserRepository.update.mockResolvedValue({ affected: 0 });

      expect(await service.updateUser(id, updateDetails)).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should successfully delete the user', async () => {
      const id = 1;

      mockUserRepository.delete.mockResolvedValue({ affected: 1 });

      expect(await service.deleteUser(id)).toEqual({ affected: 1 });
    });

    it('should return nothing if no user is found to delete', async () => {
      const id = 1;

      mockUserRepository.delete.mockResolvedValue({ affected: 0 });

      expect(await service.deleteUser(id)).toBeUndefined();
    });
  });
});
