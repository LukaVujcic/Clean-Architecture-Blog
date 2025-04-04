import { inject, injectable } from "inversify";
import { User, UserId } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { CreateUserDto, UpdateUserDto, UserResponseDto } from "../dtos/UserDto";
import { UserService } from "../interfaces/UserService";
import { randomUUID } from "crypto";
import "reflect-metadata";

@injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { username, email, password } = createUserDto;

    // Check if user with the same email or username already exists
    const existingUserByEmail = await this.userRepository.findByEmail(email);
    if (existingUserByEmail) {
      throw new Error("User with this email already exists");
    }

    const existingUserByUsername = await this.userRepository.findByUsername(username);
    if (existingUserByUsername) {
      throw new Error("User with this username already exists");
    }

    // Create new user
    const userId = new UserId(randomUUID());
    const user = new User(userId, username, email, password);
    
    await this.userRepository.save(user);
    
    return this.mapUserToDto(user);
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const userId = new UserId(id);
    const user = await this.userRepository.findById(userId);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return this.mapUserToDto(user);
  }

  async getUserByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return this.mapUserToDto(user);
  }

  async getUserByUsername(username: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findByUsername(username);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return this.mapUserToDto(user);
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => this.mapUserToDto(user));
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const userId = new UserId(id);
    const user = await this.userRepository.findById(userId);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    // Update user properties
    if (updateUserDto.username) {
      user.updateUsername(updateUserDto.username);
    }
    
    if (updateUserDto.email) {
      user.updateEmail(updateUserDto.email);
    }
    
    if (updateUserDto.password) {
      user.updatePassword(updateUserDto.password);
    }
    
    await this.userRepository.save(user);
    
    return this.mapUserToDto(user);
  }

  async deleteUser(id: string): Promise<void> {
    const userId = new UserId(id);
    await this.userRepository.delete(userId);
  }

  private mapUserToDto(user: User): UserResponseDto {
    return {
      id: user.getId().toString(),
      username: user.getUsername(),
      email: user.getEmail()
    };
  }
} 