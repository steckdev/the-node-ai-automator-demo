import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findOneWithPosts: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const expectedResult: UserResponseDto = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        isActive: true,
      };

      mockUsersService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createUserDto);

      expect(service.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedResult: UserResponseDto[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          createdAt: new Date(),
          isActive: true,
        },
      ];

      mockUsersService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const userId = '1';
      const expectedResult: UserResponseDto = {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        isActive: true,
      };

      mockUsersService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne(userId);

      expect(service.findOne).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw NotFoundException when user not found', async () => {
      const userId = 'nonexistent';

      mockUsersService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOneWithPosts', () => {
    it('should return a user with posts', async () => {
      const userId = '1';
      const expectedResult = {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        isActive: true,
        posts: [
          {
            id: '1',
            userId: '1',
            title: 'Test Post',
            content: 'Test content',
            createdAt: new Date(),
          },
        ],
      };

      mockUsersService.findOneWithPosts.mockResolvedValue(expectedResult);

      const result = await controller.findOneWithPosts(userId);

      expect(service.findOneWithPosts).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const userId = '1';

      mockUsersService.remove.mockResolvedValue(undefined);

      await controller.remove(userId);

      expect(service.remove).toHaveBeenCalledWith(userId);
    });
  });
});
