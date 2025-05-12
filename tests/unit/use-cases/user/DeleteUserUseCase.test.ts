import { DeleteUserUseCase } from "../../../../src/application/use-cases/user/DeleteUserUseCase";
import { FakeUserRepository } from "../../../fakes/repositories/FakeUserRepository";
import { User, UserId } from "../../../../src/domain/entities/User";
import { randomUUID } from "crypto";

describe("DeleteUserUseCase", () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let userRepository: FakeUserRepository;
  
  beforeEach(() => {
    userRepository = new FakeUserRepository();
    deleteUserUseCase = new DeleteUserUseCase(userRepository);
  });
  
  it("should delete user from repository", async () => {
    // Arrange
    const userId = randomUUID();
    const userIdObj = new UserId(userId);
    const user = new User(
      userIdObj,
      "testuser",
      "test@example.com",
      "password"
    );
    
    await userRepository.save(user);
    
    // Verify user exists before deletion
    const userBeforeDeletion = await userRepository.findById(userIdObj);
    expect(userBeforeDeletion).not.toBeNull();
    
    // Act
    await deleteUserUseCase.execute(userId);
    
    // Assert
    const deletedUser = await userRepository.findById(userIdObj);
    expect(deletedUser).toBeNull();
  });
}); 