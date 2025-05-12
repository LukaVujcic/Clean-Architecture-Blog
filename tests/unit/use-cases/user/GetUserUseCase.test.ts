import { GetUserUseCase } from "../../../../src/application/use-cases/user/GetUserUseCase";
import { FakeUserRepository } from "../../../fakes/repositories/FakeUserRepository";
import { User, UserId } from "../../../../src/domain/entities/User";
import { randomUUID } from "crypto";

describe("GetUserUseCase", () => {
  let getUserUseCase: GetUserUseCase;
  let userRepository: FakeUserRepository;
  
  beforeEach(() => {
    userRepository = new FakeUserRepository();
    getUserUseCase = new GetUserUseCase(userRepository);
  });
  
  describe("getById", () => {
    it("should return the user when found", async () => {
      // Arrange
      const userId = randomUUID();
      const user = new User(
        new UserId(userId),
        "testuser",
        "test@example.com",
        "password"
      );
      
      await userRepository.save(user);
      
      // Act
      const result = await getUserUseCase.getById(userId);
      
      // Assert
      expect(result).toEqual({
        id: userId,
        username: "testuser",
        email: "test@example.com"
      });
    });
    
    it("should throw error when user not found", async () => {
      // Arrange
      const userId = "nonexistent";
      
      // Act & Assert
      await expect(getUserUseCase.getById(userId))
        .rejects.toThrow("User not found");
    });
  });
  
  describe("getByEmail", () => {
    it("should return the user when found by email", async () => {
      // Arrange
      const userId = randomUUID();
      const email = "test@example.com";
      const user = new User(
        new UserId(userId),
        "testuser",
        email,
        "password"
      );
      
      await userRepository.save(user);
      
      // Act
      const result = await getUserUseCase.getByEmail(email);
      
      // Assert
      expect(result).toEqual({
        id: userId,
        username: "testuser",
        email: email
      });
    });
    
    it("should throw error when user not found by email", async () => {
      // Act & Assert
      await expect(getUserUseCase.getByEmail("nonexistent@example.com"))
        .rejects.toThrow("User not found");
    });
  });
  
  describe("getAll", () => {
    it("should return all users", async () => {
      // Arrange
      const user1 = new User(
        new UserId(randomUUID()),
        "user1",
        "user1@example.com",
        "password"
      );
      
      const user2 = new User(
        new UserId(randomUUID()),
        "user2",
        "user2@example.com",
        "password"
      );
      
      await userRepository.save(user1);
      await userRepository.save(user2);
      
      // Act
      const result = await getUserUseCase.getAll();
      
      // Assert
      expect(result.length).toBe(2);
      expect(result[0].username).toBe("user1");
      expect(result[1].username).toBe("user2");
    });
  });
}); 