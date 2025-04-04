import { SequelizeUserRepository } from "../../../src/infrastructure/repositories/SequelizeUserRepository";
import { User, UserId } from "../../../src/domain/entities/User";
import sequelize from "../../../src/infrastructure/config/database";
import UserModel from "../../../src/infrastructure/models/UserModel";
import { randomUUID } from "crypto";

describe("SequelizeUserRepository Integration Tests", () => {
  let repository: SequelizeUserRepository;
  
  beforeAll(async () => {
    // Connect to database and sync models
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    repository = new SequelizeUserRepository();
    // Clear users table before each test
    await UserModel.destroy({ where: {} });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("save", () => {
    it("should save a new user to the database", async () => {
      // Arrange
      const userId = randomUUID();
      const testUser = new User(
        new UserId(userId),
        "testuser",
        "test@example.com",
        "password123"
      );
      
      // Act
      await repository.save(testUser);

      // Assert
      const userInDb = await UserModel.findByPk(userId);
      expect(userInDb).not.toBeNull();
      expect(userInDb?.id).toBe(userId);
      expect(userInDb?.username).toBe(testUser.getUsername());
      expect(userInDb?.email).toBe(testUser.getEmail());
    });

    it("should update an existing user", async () => {
      // Arrange
      const userId = randomUUID();
      const testUser = new User(
        new UserId(userId),
        "testuser",
        "test@example.com",
        "password123"
      );
      
      await repository.save(testUser);

      // Update the user
      testUser.updateUsername("updatedusername");
      testUser.updateEmail("updated@example.com");

      // Act
      await repository.save(testUser);

      // Assert
      const userInDb = await UserModel.findByPk(userId);
      expect(userInDb).not.toBeNull();
      expect(userInDb?.username).toBe("updatedusername");
      expect(userInDb?.email).toBe("updated@example.com");
    });
  });

  describe("findById", () => {
    it("should return a user when it exists", async () => {
      // Arrange
      const userId = randomUUID();
      const testUser = new User(
        new UserId(userId),
        "testuser",
        "test@example.com",
        "password123"
      );
      
      await repository.save(testUser);

      // Act
      const foundUser = await repository.findById(new UserId(userId));

      // Assert
      expect(foundUser).not.toBeNull();
      expect(foundUser?.getId().toString()).toBe(userId);
      expect(foundUser?.getUsername()).toBe(testUser.getUsername());
      expect(foundUser?.getEmail()).toBe(testUser.getEmail());
    });

    it("should return null when user does not exist", async () => {
      // Act
      const foundUser = await repository.findById(new UserId("nonexistent-id"));

      // Assert
      expect(foundUser).toBeNull();
    });
  });

  describe("findByEmail", () => {
    it("should return a user when it exists", async () => {
      // Arrange
      const userId = randomUUID();
      const testUser = new User(
        new UserId(userId),
        "testuser",
        "test@example.com",
        "password123"
      );
      
      await repository.save(testUser);

      // Act
      const foundUser = await repository.findByEmail(testUser.getEmail());

      // Assert
      expect(foundUser).not.toBeNull();
      expect(foundUser?.getEmail()).toBe(testUser.getEmail());
    });

    it("should return null when user does not exist", async () => {
      // Act
      const foundUser = await repository.findByEmail("nonexistent@example.com");

      // Assert
      expect(foundUser).toBeNull();
    });
  });

  describe("delete", () => {
    it("should delete user from database", async () => {
      // Arrange
      const userId = randomUUID();
      const testUser = new User(
        new UserId(userId),
        "testuser",
        "test@example.com",
        "password123"
      );
      
      await repository.save(testUser);

      // Act
      await repository.delete(new UserId(userId));

      // Assert
      const userInDb = await UserModel.findByPk(userId);
      expect(userInDb).toBeNull();
    });
  });
}); 