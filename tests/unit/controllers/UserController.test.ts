import { UserController } from "../../../src/infrastructure/controllers/UserController";
import { FakeCreateUserUseCase } from "../../fakes/use-cases/user/FakeCreateUserUseCase";
import { FakeGetUserUseCase } from "../../fakes/use-cases/user/FakeGetUserUseCase";
import { FakeUpdateUserUseCase } from "../../fakes/use-cases/user/FakeUpdateUserUseCase";
import { FakeDeleteUserUseCase } from "../../fakes/use-cases/user/FakeDeleteUserUseCase";
import { CreateUserDto, UpdateUserDto, UserResponseDto } from "../../../src/application/dtos/UserDto";
import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { CreateUserUseCase } from "../../../src/application/use-cases/user/CreateUserUseCase";
import { GetUserUseCase } from "../../../src/application/use-cases/user/GetUserUseCase";
import { UpdateUserUseCase } from "../../../src/application/use-cases/user/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../../src/application/use-cases/user/DeleteUserUseCase";

// Helper functions to create request and response objects
const createRequest = (): Request => {
  const req: Partial<Request> = {
    body: {},
    params: {}
  };
  return req as Request;
};

const createResponse = (): { res: Response; statusFunc: jest.Mock; jsonFunc: jest.Mock; sendFunc: jest.Mock } => {
  const statusFunc = jest.fn().mockReturnThis();
  const jsonFunc = jest.fn().mockReturnThis();
  const sendFunc = jest.fn().mockReturnThis();
  
  const res: Partial<Response> = {
    status: statusFunc,
    json: jsonFunc,
    send: sendFunc
  };
  
  return { 
    res: res as Response, 
    statusFunc, 
    jsonFunc, 
    sendFunc 
  };
};

describe("UserController", () => {
  let userController: UserController;
  let createUserUseCase: FakeCreateUserUseCase;
  let getUserUseCase: FakeGetUserUseCase;
  let updateUserUseCase: FakeUpdateUserUseCase;
  let deleteUserUseCase: FakeDeleteUserUseCase;
  
  beforeEach(() => {
    createUserUseCase = new FakeCreateUserUseCase();
    getUserUseCase = new FakeGetUserUseCase();
    updateUserUseCase = new FakeUpdateUserUseCase();
    deleteUserUseCase = new FakeDeleteUserUseCase();
    
    userController = new UserController(
      createUserUseCase as unknown as CreateUserUseCase,
      getUserUseCase as unknown as GetUserUseCase,
      updateUserUseCase as unknown as UpdateUserUseCase,
      deleteUserUseCase as unknown as DeleteUserUseCase
    );
  });
  
  describe("createUser", () => {
    it("should create a user and return 201 status", async () => {
      // Arrange
      const req = createRequest();
      const { res, statusFunc, jsonFunc } = createResponse();
      
      const createUserDto: CreateUserDto = {
        username: "testuser",
        email: "test@example.com",
        password: "password123"
      };
      
      req.body = createUserDto;
      
      // Act
      await userController.createUser(req, res);
      
      // Assert
      expect(statusFunc).toHaveBeenCalledWith(201);
      expect(jsonFunc).toHaveBeenCalledWith(expect.objectContaining({
        username: createUserDto.username,
        email: createUserDto.email
      }));
    });
    
    it("should return 400 status when email already exists", async () => {
      // Arrange
      const req = createRequest();
      const { res, statusFunc, jsonFunc } = createResponse();
      
      // Add existing user
      const existingUser: UserResponseDto = {
        id: randomUUID(),
        username: "existinguser",
        email: "existing@example.com"
      };
      
      createUserUseCase.addUser(existingUser);
      
      const createUserDto: CreateUserDto = {
        username: "testuser",
        email: "existing@example.com",
        password: "password123"
      };
      
      req.body = createUserDto;
      
      // Act
      await userController.createUser(req, res);
      
      // Assert
      expect(statusFunc).toHaveBeenCalledWith(400);
      expect(jsonFunc).toHaveBeenCalledWith({
        message: "User with this email already exists"
      });
    });
  });
  
  describe("getUserById", () => {
    it("should return a user and 200 status when user exists", async () => {
      // Arrange
      const req = createRequest();
      const { res, statusFunc, jsonFunc } = createResponse();
      
      const userId = randomUUID();
      const user: UserResponseDto = {
        id: userId,
        username: "testuser",
        email: "test@example.com"
      };
      
      getUserUseCase.addUser(user);
      
      req.params.id = userId;
      
      // Act
      await userController.getUserById(req, res);
      
      // Assert
      expect(statusFunc).toHaveBeenCalledWith(200);
      expect(jsonFunc).toHaveBeenCalledWith(user);
    });
    
    it("should return 404 status when user does not exist", async () => {
      // Arrange
      const req = createRequest();
      const { res, statusFunc, jsonFunc } = createResponse();
      
      req.params.id = "nonexistent";
      
      // Act
      await userController.getUserById(req, res);
      
      // Assert
      expect(statusFunc).toHaveBeenCalledWith(404);
      expect(jsonFunc).toHaveBeenCalledWith({
        message: "User not found"
      });
    });
  });
  
  describe("getAllUsers", () => {
    it("should return all users and 200 status", async () => {
      // Arrange
      const req = createRequest();
      const { res, statusFunc, jsonFunc } = createResponse();
      
      const user1: UserResponseDto = {
        id: randomUUID(),
        username: "user1",
        email: "user1@example.com"
      };
      
      const user2: UserResponseDto = {
        id: randomUUID(),
        username: "user2",
        email: "user2@example.com"
      };
      
      getUserUseCase.addUser(user1);
      getUserUseCase.addUser(user2);
      
      // Act
      await userController.getAllUsers(req, res);
      
      // Assert
      expect(statusFunc).toHaveBeenCalledWith(200);
      expect(jsonFunc).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining(user1),
        expect.objectContaining(user2)
      ]));
    });
  });
  
  describe("updateUser", () => {
    it("should update a user and return 200 status", async () => {
      // Arrange
      const req = createRequest();
      const { res, statusFunc, jsonFunc } = createResponse();
      
      const userId = randomUUID();
      const user: UserResponseDto = {
        id: userId,
        username: "oldusername",
        email: "old@example.com"
      };
      
      updateUserUseCase.addUser(user);
      
      const updateUserDto: UpdateUserDto = {
        username: "newusername",
        email: "new@example.com"
      };
      
      req.params.id = userId;
      req.body = updateUserDto;
      
      // Act
      await userController.updateUser(req, res);
      
      // Assert
      expect(statusFunc).toHaveBeenCalledWith(200);
      expect(jsonFunc).toHaveBeenCalledWith(expect.objectContaining({
        id: userId,
        username: "newusername",
        email: "new@example.com"
      }));
    });
    
    it("should return 404 status when user does not exist", async () => {
      // Arrange
      const req = createRequest();
      const { res, statusFunc, jsonFunc } = createResponse();
      
      req.params.id = "nonexistent";
      req.body = { username: "newusername" };
      
      // Act
      await userController.updateUser(req, res);
      
      // Assert
      expect(statusFunc).toHaveBeenCalledWith(404);
      expect(jsonFunc).toHaveBeenCalledWith({
        message: "User not found"
      });
    });
  });
  
  describe("deleteUser", () => {
    it("should delete a user and return 204 status", async () => {
      // Arrange
      const req = createRequest();
      const { res, statusFunc, sendFunc } = createResponse();
      
      const userId = randomUUID();
      const user: UserResponseDto = {
        id: userId,
        username: "testuser",
        email: "test@example.com"
      };
      
      getUserUseCase.addUser(user);
      deleteUserUseCase.addUser(user);
      
      req.params.id = userId;
      
      // Act
      await userController.deleteUser(req, res);
      
      // Assert
      expect(statusFunc).toHaveBeenCalledWith(204);
      expect(sendFunc).toHaveBeenCalled();
    });
    
    it("should return 404 status when user does not exist", async () => {
      // Arrange
      const req = createRequest();
      const { res, statusFunc, jsonFunc } = createResponse();
      
      req.params.id = "nonexistent";
      
      // Act
      await userController.deleteUser(req, res);
      
      // Assert
      expect(statusFunc).toHaveBeenCalledWith(404);
      expect(jsonFunc).toHaveBeenCalledWith({
        message: "User not found"
      });
    });
  });
}); 