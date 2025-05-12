import { UserResponseDto } from "../../../../src/application/dtos/UserDto";

export class FakeDeleteUserUseCase {
  private users: Map<string, UserResponseDto> = new Map();

  async execute(id: string): Promise<void> {
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