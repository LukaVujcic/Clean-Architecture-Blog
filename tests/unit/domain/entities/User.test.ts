import { User, UserId } from "../../../../src/domain/entities/User";
import { randomUUID } from "crypto";

describe("User entity", () => {
  it("should update username", () => {
    const user = new User(new UserId(randomUUID()), "user", "test@example.com", "pass");
    user.updateUsername("newuser");
    expect(user.getUsername()).toBe("newuser");
  });

  it("should update email", () => {
    const user = new User(new UserId(randomUUID()), "user", "test@example.com", "pass");
    user.updateEmail("new@example.com");
    expect(user.getEmail()).toBe("new@example.com");
  });

  it("should update password", () => {
    const user = new User(new UserId(randomUUID()), "user", "test@example.com", "pass");
    user.updatePassword("newpass");
    expect(user.getPassword()).toBe("newpass");
  });

  it("UserId equality and toString should work", () => {
    const value = randomUUID();
    const id1 = new UserId(value);
    const id2 = new UserId(value);
    const id3 = new UserId(randomUUID());

    expect(id1.equals(id2)).toBe(true);
    expect(id1.equals(id3)).toBe(false);
    expect(id1.toString()).toBe(value);
  });
});
