import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entities/user.entity';
import { Post } from '../posts/entities/post.entity';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 2;
const HASH_ITERATIONS = 1000;
const HASH_LENGTH = 64;
const HASH_ALGORITHM = 'sha512';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private posts: Post[] = [];

  constructor() {
    this.initializeData();
  }

  private async initializeData(): Promise<void> {
    // Initialize with sample data for demo
    this.users = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedpassword',
        salt: 'salt',
        createdAt: new Date(),
        isActive: true,
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'hashedpassword',
        salt: 'salt',
        createdAt: new Date(),
        isActive: true,
      },
    ];

    this.posts = [
      {
        id: '1',
        userId: '1',
        title: 'First Post',
        content: 'This is my first post',
        createdAt: new Date(),
      },
      {
        id: '2',
        userId: '1',
        title: 'Second Post',
        content: 'This is my second post',
        createdAt: new Date(),
      },
    ];
  }

  async findAll(): Promise<UserResponseDto[]> {
    return this.users.filter((user) => user.isActive).map((user) => this.mapToResponseDto(user));
  }

  async findOne(id: string): Promise<UserResponseDto> {
    this.validateId(id);

    const user = this.users.find((u) => u.id === id && u.isActive);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.mapToResponseDto(user);
  }

  async findOneWithPosts(id: string): Promise<UserResponseDto & { posts: Post[] }> {
    const user = await this.findOne(id);
    const userPosts = await this.getUserPosts(id);

    return {
      ...user,
      posts: userPosts,
    };
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    await this.validateCreateUser(createUserDto);

    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const { hashedPassword, salt } = await this.hashPassword(createUserDto.password);

    const newUser: User = {
      id: uuidv4(),
      name: createUserDto.name,
      email: createUserDto.email.toLowerCase(),
      password: hashedPassword,
      salt,
      createdAt: new Date(),
      isActive: true,
    };

    this.users.push(newUser);

    return this.mapToResponseDto(newUser);
  }

  async remove(id: string): Promise<void> {
    this.validateId(id);

    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Soft delete
    this.users[userIndex].isActive = false;
  }

  private async getUserPosts(userId: string): Promise<Post[]> {
    return this.posts.filter((post) => post.userId === userId);
  }

  private async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.isActive,
    );
  }

  private validateId(id: string): void {
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('Valid ID is required');
    }
  }

  private async validateCreateUser(createUserDto: CreateUserDto): Promise<void> {
    if (!createUserDto.email || !this.isValidEmail(createUserDto.email)) {
      throw new BadRequestException('Valid email is required');
    }

    if (!createUserDto.name || createUserDto.name.length < MIN_NAME_LENGTH) {
      throw new BadRequestException(`Name must be at least ${MIN_NAME_LENGTH} characters long`);
    }

    if (!createUserDto.password || createUserDto.password.length < MIN_PASSWORD_LENGTH) {
      throw new BadRequestException(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
      );
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private async hashPassword(password: string): Promise<{ hashedPassword: string; salt: string }> {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(16).toString('hex');

      crypto.pbkdf2(
        password,
        salt,
        HASH_ITERATIONS,
        HASH_LENGTH,
        HASH_ALGORITHM,
        (err, derivedKey) => {
          if (err) {
            reject(err);
            return;
          }

          resolve({
            hashedPassword: derivedKey.toString('hex'),
            salt,
          });
        },
      );
    });
  }

  private mapToResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      isActive: user.isActive,
    };
  }
}
