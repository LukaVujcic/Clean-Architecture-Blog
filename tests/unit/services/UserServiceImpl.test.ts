import { UserServiceImpl } from "../../../src/application/services/UserServiceImpl";
import { FakeUserRepository } from "../../fakes/repositories/FakeUserRepository";
import { User, UserId } from "../../../src/domain/entities/User";
import { CreateUserDto, UpdateUserDto } from "../../../src/application/dtos/UserDto";
import { randomUUID } from "crypto";

describe("UserServiceImpl", () => {
  let userService: UserServiceImpl;
  let userRepository: FakeUserRepository;
  
  beforeEach(() => {
    userRepository = new FakeUserRepository();
    userService = new UserServiceImpl(userRepository);
  });
  
  describe("createUser", () => {
    it("should create a new user", async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        username: "testuser",
        email: "test@example.com",
        password: "password123"
      };
      
      // Act
      const result = await userService.createUser(createUserDto);
      
      // Assert
      expect(result).toEqual(expect.objectContaining({
        username: createUserDto.username,
        email: createUserDto.email
      }));
      
      // Verify user was saved to repository
      const users = await userRepository.findAll();
      expect(users.length).toBe(1);
      expect(users[0].getUsername()).toBe(createUserDto.username);
      expect(users[0].getEmail()).toBe(createUserDto.email);
    });
    
    it("should throw error if email already exists", async () => {
      // Arrange
      const existingUser = new User(
        new UserId(randomUUID()),
        "existinguser",
        "existing@example.com",
        "password"
      );
      
      await userRepository.save(existingUser);
      
      const createUserDto: CreateUserDto = {
        username: "testuser",
        email: "existing@example.com",
        password: "password123"
      };
      
      // Act & Assert
      await expect(userService.createUser(createUserDto))
        .rejects.toThrow("User with this email already exists");
    });
    
    it("should throw error if username already exists", async () => {
      // Arrange
      const existingUser = new User(
        new UserId(randomUUID()),
        "existinguser",
        "existing@example.com",
        "password"
      );
      
      await userRepository.save(existingUser);
      
      const createUserDto: CreateUserDto = {
        username: "existinguser",
        email: "test@example.com",
        password: "password123"
      };
      
      // Act & Assert
      await expect(userService.createUser(createUserDto))
        .rejects.toThrow("User with this username already exists");
    });
  });
  
  describe("getUserById", () => {
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
      const result = await userService.getUserById(userId);
      
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
      await expect(userService.getUserById(userId))
        .rejects.toThrow("User not found");
    });
  });
  
  describe("updateUser", () => {
    it("should update user properties", async () => {
      // Arrange
      const userId = randomUUID();
      const user = new User(
        new UserId(userId),
        "oldusername",
        "old@example.com",
        "oldpassword"
      );
      
      await userRepository.save(user);
      
      const updateUserDto: UpdateUserDto = {
        username: "newusername",
        email: "new@example.com"
      };
      
      // Act
      const result = await userService.updateUser(userId, updateUserDto);
      
      // Assert
      expect(result).toEqual({
        id: userId,
        username: "newusername",
        email: "new@example.com"
      });
      
      // Verify user was updated in repository
      const updatedUser = await userRepository.findById(new UserId(userId));
      expect(updatedUser?.getUsername()).toBe("newusername");
      expect(updatedUser?.getEmail()).toBe("new@example.com");
    });
    
    it("should throw error when user not found", async () => {
      // Arrange
      const userId = "nonexistent";
      const updateUserDto: UpdateUserDto = {
        username: "newusername"
      };
      
      // Act & Assert
      await expect(userService.updateUser(userId, updateUserDto))
        .rejects.toThrow("User not found");
    });
  });
  
  describe("deleteUser", () => {
    it("should delete user from repository", async () => {
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
      await userService.deleteUser(userId);
      
      // Assert
      const deletedUser = await userRepository.findById(new UserId(userId));
      expect(deletedUser).toBeNull();
    });
  });
}); 