export class UserId {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  equals(id: UserId): boolean {
    return this.value === id.value;
  }
}

export class User {
  private id: UserId;
  private username: string;
  private email: string;
  private password: string;

  constructor(id: UserId, username: string, email: string, password: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  getId(): UserId {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  updateUsername(username: string): void {
    this.username = username;
  }

  updateEmail(email: string): void {
    this.email = email;
  }

  updatePassword(password: string): void {
    this.password = password;
  }
} 