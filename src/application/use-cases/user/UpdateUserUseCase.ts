import { inject, injectable } from "inversify";
import { UserId } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/ports/UserRepository";
import { UpdateUserDto, UserResponseDto } from "../../dtos/UserDto";
import { UserMapper } from "../../mappers/UserMapper";
import "reflect-metadata";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
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
    
    return UserMapper.toDto(user);
  }
} 