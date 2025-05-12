import { UpdateUserDto, UserResponseDto } from "../../../../src/application/dtos/UserDto";

export class FakeUpdateUserUseCase {
  private users: Map<string, UserResponseDto> = new Map();

  async execute(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
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

  // Helper methods for testing
  addUser(user: UserResponseDto): void {
    this.users.set(user.id, user);
  }

  clear(): void {
    this.users.clear();
  }
} 