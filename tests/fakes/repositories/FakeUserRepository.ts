import { UserRepository } from "../../../src/domain/ports/UserRepository";
import { User, UserId } from "../../../src/domain/entities/User";

export class FakeUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();

  async findById(id: UserId): Promise<User | null> {
    const user = this.users.get(id.toString());
    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.getEmail() === email) {
        return user;
      }
    }
    return null;
  }

  async findByUsername(username: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.getUsername() === username) {
        return user;
      }
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async save(user: User): Promise<void> {
    this.users.set(user.getId().toString(), user);
  }

  async delete(id: UserId): Promise<void> {
    this.users.delete(id.toString());
  }

  // Helper methods for testing
  clear(): void {
    this.users.clear();
  }
} 