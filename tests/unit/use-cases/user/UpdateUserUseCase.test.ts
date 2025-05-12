import { UpdateUserUseCase } from "../../../../src/application/use-cases/user/UpdateUserUseCase";
import { FakeUserRepository } from "../../../fakes/repositories/FakeUserRepository";
import { User, UserId } from "../../../../src/domain/entities/User";
import { UpdateUserDto } from "../../../../src/application/dtos/UserDto";
import { randomUUID } from "crypto";

describe("UpdateUserUseCase", () => {
  let updateUserUseCase: UpdateUserUseCase;
  let userRepository: FakeUserRepository;
  
  beforeEach(() => {
    userRepository = new FakeUserRepository();
    updateUserUseCase = new UpdateUserUseCase(userRepository);
  });
  
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
    const result = await updateUserUseCase.execute(userId, updateUserDto);
    
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
    await expect(updateUserUseCase.execute(userId, updateUserDto))
      .rejects.toThrow("User not found");
  });
}); 