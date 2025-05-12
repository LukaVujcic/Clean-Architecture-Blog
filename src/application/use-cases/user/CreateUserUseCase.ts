import { inject, injectable } from "inversify";
import { User, UserId } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/ports/UserRepository";
import { CreateUserDto, UserResponseDto } from "../../dtos/UserDto";
import { UserMapper } from "../../mappers/UserMapper";
import { randomUUID } from "crypto";
import "reflect-metadata";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<UserResponseDto> {
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
    
    return UserMapper.toDto(user);
  }
} 