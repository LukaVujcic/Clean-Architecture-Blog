import { inject, injectable } from "inversify";
import { UserId } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/ports/UserRepository";
import { UserResponseDto } from "../../dtos/UserDto";
import { UserMapper } from "../../mappers/UserMapper";
import "reflect-metadata";

@injectable()
export class GetUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  async getById(id: string): Promise<UserResponseDto> {
    const userId = new UserId(id);
    const user = await this.userRepository.findById(userId);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return UserMapper.toDto(user);
  }

  async getByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return UserMapper.toDto(user);
  }

  async getByUsername(username: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findByUsername(username);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return UserMapper.toDto(user);
  }

  async getAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => UserMapper.toDto(user));
  }
} 