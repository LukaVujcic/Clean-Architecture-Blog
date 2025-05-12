import { CreateBlogUseCase } from "../../../../src/application/use-cases/blog/CreateBlogUseCase";
import { FakeBlogRepository } from "../../../fakes/repositories/FakeBlogRepository";
import { FakeUserRepository } from "../../../fakes/repositories/FakeUserRepository";
import { User, UserId } from "../../../../src/domain/entities/User";
import { CreateBlogDto } from "../../../../src/application/dtos/BlogDto";
import { randomUUID } from "crypto";

describe("CreateBlogUseCase", () => {
  let createBlogUseCase: CreateBlogUseCase;
  let blogRepository: FakeBlogRepository;
  let userRepository: FakeUserRepository;
  
  beforeEach(() => {
    blogRepository = new FakeBlogRepository();
    userRepository = new FakeUserRepository();
    createBlogUseCase = new CreateBlogUseCase(blogRepository, userRepository);
  });
  
  it("should create a new blog", async () => {
    // Arrange
    const userId = randomUUID();
    const user = new User(new UserId(userId), "testuser", "test@example.com", "password123");
    await userRepository.save(user);
    
    const createBlogDto: CreateBlogDto = {
      title: "Test Blog",
      content: "This is a test blog",
      authorId: userId
    };
    
    // Act
    const result = await createBlogUseCase.execute(createBlogDto);
    
    // Assert
    expect(result).toEqual(expect.objectContaining({
      title: createBlogDto.title,
      content: createBlogDto.content,
      authorId: userId
    }));
    
    // Verify blog was saved to repository
    const blogs = await blogRepository.findAll();
    expect(blogs.length).toBe(1);
    expect(blogs[0].getTitle()).toBe(createBlogDto.title);
    expect(blogs[0].getContent()).toBe(createBlogDto.content);
    expect(blogs[0].getAuthorId().toString()).toBe(userId);
  });
  
  it("should throw error when author not found", async () => {
    // Arrange
    const nonExistentUserId = randomUUID();
    
    const createBlogDto: CreateBlogDto = {
      title: "Test Blog",
      content: "This is a test blog",
      authorId: nonExistentUserId
    };
    
    // Act & Assert
    await expect(createBlogUseCase.execute(createBlogDto))
      .rejects.toThrow("Author not found");
  });
}); 