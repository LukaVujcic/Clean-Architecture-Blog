import { CreateUserUseCase } from "../../../../src/application/use-cases/user/CreateUserUseCase";
import { FakeUserRepository } from "../../../fakes/repositories/FakeUserRepository";
import { User, UserId } from "../../../../src/domain/entities/User";
import { CreateUserDto } from "../../../../src/application/dtos/UserDto";
import { randomUUID } from "crypto";

describe("CreateUserUseCase", () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: FakeUserRepository;
  
  beforeEach(() => {
    userRepository = new FakeUserRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });
  
  it("should create a new user", async () => {
    // Arrange
    const createUserDto: CreateUserDto = {
      username: "testuser",
      email: "test@example.com",
      password: "password123"
    };
    
    // Act
    const result = await createUserUseCase.execute(createUserDto);
    
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
    await expect(createUserUseCase.execute(createUserDto))
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
    await expect(createUserUseCase.execute(createUserDto))
      .rejects.toThrow("User with this username already exists");
  });
}); 