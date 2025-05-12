import { UserResponseDto } from "../../../../src/application/dtos/UserDto";

export class FakeGetUserUseCase {
  private users: Map<string, UserResponseDto> = new Map();

  async getById(id: string): Promise<UserResponseDto> {
    const user = this.users.get(id);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return user;
  }

  async getByEmail(email: string): Promise<UserResponseDto> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    
    throw new Error("User not found");
  }

  async getByUsername(username: string): Promise<UserResponseDto> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    
    throw new Error("User not found");
  }

  async getAll(): Promise<UserResponseDto[]> {
    return Array.from(this.users.values());
  }

  // Helper methods for testing
  addUser(user: UserResponseDto): void {
    this.users.set(user.id, user);
  }

  clear(): void {
    this.users.clear();
  }
} 