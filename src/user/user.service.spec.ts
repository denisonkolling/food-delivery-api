import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { EntityManager, UniqueConstraintViolationException } from '@mikro-orm/postgresql';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import * as helpers from '../common/helpers';

// Mock the entities and modules that are causing issues
jest.mock('./entities/user.entity', () => {
  class MockUser {
    id: number;
    email: string;
    password: string;
  }
  return { User: MockUser };
});

jest.mock('../common/helpers');

// Mock Customer and Restaurant entities
jest.mock('../customer/entities/customer.entity', () => ({
  Customer: class MockCustomer { },
}));

jest.mock('../restaurant/entities/restaurant.entity', () => ({
  Restaurant: class MockRestaurant { },
}));

describe('UserService', () => {
  let service: UserService;
  let entityManager: EntityManager;

  const mockEntityManager = {
    findOne: jest.fn(),
    persistAndFlush: jest.fn(),
    assign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    entityManager = module.get<EntityManager>(EntityManager);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123'
      };

      const hashedPassword = 'hashedPassword123';
      const newUser = new User();
      Object.assign(newUser, { ...createUserDto, password: hashedPassword });

      jest.spyOn(helpers, 'hashPassword').mockResolvedValue(hashedPassword);
      jest.spyOn(service as any, 'ensureEmailIsUnique').mockResolvedValue(undefined);
      jest.spyOn(service, 'buildUser').mockReturnValue(newUser);

      await service.create(createUserDto);

      expect(helpers.hashPassword).toHaveBeenCalledWith(createUserDto.password);
      expect(service['ensureEmailIsUnique']).toHaveBeenCalledWith(createUserDto.email);
      expect(service.buildUser).toHaveBeenCalledWith(createUserDto, hashedPassword);
      expect(entityManager.persistAndFlush).toHaveBeenCalledWith(newUser);
    });

    it('should throw UniqueConstraintViolationException if email is not unique', async () => {
      const createUserDto: CreateUserDto = {
        email: 'existing@example.com',
        password: 'password123'
      };

      jest.spyOn(service as any, 'ensureEmailIsUnique').mockRejectedValue(
        new UniqueConstraintViolationException(new Error('Email already exists'))
      );

      await expect(service.create(createUserDto)).rejects.toThrow(UniqueConstraintViolationException);
    });
  });

  describe('findUserById', () => {
    it('should return a user if found', async () => {
      const userId = 1;
      const mockUser = new User();
      mockUser.id = userId;

      mockEntityManager.findOne.mockResolvedValue(mockUser);

      const result = await service.findUserById(userId);

      expect(result).toEqual(mockUser);
      expect(entityManager.findOne).toHaveBeenCalledWith(User, userId);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const userId = 999;

      mockEntityManager.findOne.mockResolvedValue(null);

      await expect(service.findUserById(userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('should return a user if found', async () => {
      const email = 'test@example.com';
      const mockUser = new User();
      mockUser.email = email;

      mockEntityManager.findOne.mockResolvedValue(mockUser);

      const result = await service.findByEmail(email);

      expect(result).toEqual(mockUser);
      expect(entityManager.findOne).toHaveBeenCalledWith(User, { email });
    });

    it('should return null if user is not found', async () => {
      const email = 'nonexistent@example.com';

      mockEntityManager.findOne.mockResolvedValue(null);

      const result = await service.findByEmail(email);

      expect(result).toBeNull();
    });
  });

  describe('ensureEmailIsUnique', () => {
    it('should not throw if email is unique', async () => {
      const email = 'unique@example.com';

      mockEntityManager.findOne.mockResolvedValue(null);

      await expect(service['ensureEmailIsUnique'](email)).resolves.not.toThrow();
    });

    it('should throw UniqueConstraintViolationException if email is not unique', async () => {
      const email = 'existing@example.com';
      const existingUser = new User();
      existingUser.email = email;

      mockEntityManager.findOne.mockResolvedValue(existingUser);

      await expect(service['ensureEmailIsUnique'](email)).rejects.toThrow(UniqueConstraintViolationException);
    });
  });

  describe('buildUser', () => {
    it('should build a user object with hashed password', () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123'
      };
      const hashedPassword = 'hashedPassword123';

      const expectedUser = new User();
      Object.assign(expectedUser, { ...createUserDto, password: hashedPassword });

      mockEntityManager.assign.mockImplementation((user, data) => Object.assign(user, data));

      const result = service.buildUser(createUserDto, hashedPassword);

      expect(result).toEqual(expectedUser);
      expect(entityManager.assign).toHaveBeenCalledWith(expect.any(User), {
        ...createUserDto,
        password: hashedPassword,
      });
    });
  });
});