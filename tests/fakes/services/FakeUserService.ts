import { UserService } from "../../../src/application/interfaces/UserService";
import { CreateUserDto, UpdateUserDto, UserResponseDto } from "../../../src/application/dtos/UserDto";
import { randomUUID } from "crypto";

export class FakeUserService implements UserService {
  private users: Map<string, UserResponseDto> = new Map();

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const userId = randomUUID();
    
    // Check if email or username already exists
    for (const user of this.users.values()) {
      if (user.email === createUserDto.email) {
        throw new Error("User with this email already exists");
      }
      if (user.username === createUserDto.username) {
        throw new Error("User with this username already exists");
      }
    }
    
    const newUser: UserResponseDto = {
      id: userId,
      username: createUserDto.username,
      email: createUserDto.email
    };
    
    this.users.set(userId, newUser);
    return newUser;
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const user = this.users.get(id);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return user;
  }

  async getUserByEmail(email: string): Promise<UserResponseDto> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    
    throw new Error("User not found");
  }

  async getUserByUsername(username: string): Promise<UserResponseDto> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    
    throw new Error("User not found");
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    return Array.from(this.users.values());
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const user = this.users.get(id);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    if (updateUserDto.username) {
      // Check if username is already taken by another user
      for (const existingUser of this.users.values()) {
        if (existingUser.id !== id && existingUser.username === updateUserDto.username) {
          throw new Error("Username already taken");
        }
      }
      user.username = updateUserDto.username;
    }
    
    if (updateUserDto.email) {
      // Check if email is already taken by another user
      for (const existingUser of this.users.values()) {
        if (existingUser.id !== id && existingUser.email === updateUserDto.email) {
          throw new Error("Email already taken");
        }
      }
      user.email = updateUserDto.email;
    }
    
    this.users.set(id, user);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    if (!this.users.has(id)) {
      throw new Error("User not found");
    }
    
    this.users.delete(id);
  }

  // Helper methods for testing
  addUser(user: UserResponseDto): void {
    this.users.set(user.id, user);
  }

  clear(): void {
    this.users.clear();
  }
} 