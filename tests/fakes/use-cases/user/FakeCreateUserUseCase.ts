import { CreateUserDto, UserResponseDto } from "../../../../src/application/dtos/UserDto";
import { randomUUID } from "crypto";

export class FakeCreateUserUseCase {
  private users: Map<string, UserResponseDto> = new Map();

  async execute(createUserDto: CreateUserDto): Promise<UserResponseDto> {
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

  // Helper methods for testing
  addUser(user: UserResponseDto): void {
    this.users.set(user.id, user);
  }

  clear(): void {
    this.users.clear();
  }
} 