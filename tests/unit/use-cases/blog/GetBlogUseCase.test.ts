import { GetBlogUseCase } from "../../../../src/application/use-cases/blog/GetBlogUseCase";
import { FakeBlogRepository } from "../../../fakes/repositories/FakeBlogRepository";
import { Blog, BlogId } from "../../../../src/domain/entities/Blog";
import { UserId } from "../../../../src/domain/entities/User";
import { randomUUID } from "crypto";

describe("GetBlogUseCase", () => {
  let getBlogUseCase: GetBlogUseCase;
  let blogRepository: FakeBlogRepository;
  
  beforeEach(() => {
    blogRepository = new FakeBlogRepository();
    getBlogUseCase = new GetBlogUseCase(blogRepository);
  });
  
  describe("getById", () => {
    it("should return the blog when found", async () => {
      // Arrange
      const blogId = randomUUID();
      const userId = randomUUID();
      const blog = new Blog(
        new BlogId(blogId),
        "Test Blog",
        "This is a test blog",
        new UserId(userId)
      );
      
      await blogRepository.save(blog);
      
      // Act
      const result = await getBlogUseCase.getById(blogId);
      
      // Assert
      expect(result).toEqual({
        id: blogId,
        title: "Test Blog",
        content: "This is a test blog",
        authorId: userId,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        likes: 0
      });
    });
    
    it("should throw error when blog not found", async () => {
      // Arrange
      const blogId = "nonexistent";
      
      // Act & Assert
      await expect(getBlogUseCase.getById(blogId))
        .rejects.toThrow("Blog not found");
    });
  });
  
  describe("getByAuthorId", () => {
    it("should return blogs for specific author", async () => {
      // Arrange
      const userId = randomUUID();
      const otherUserId = randomUUID();
      
      // Create blogs for our test user
      const blog1 = new Blog(
        new BlogId(randomUUID()),
        "Blog 1",
        "Content 1",
        new UserId(userId)
      );
      
      const blog2 = new Blog(
        new BlogId(randomUUID()),
        "Blog 2",
        "Content 2",
        new UserId(userId)
      );
      
      // Create blog for another user
      const blog3 = new Blog(
        new BlogId(randomUUID()),
        "Blog 3",
        "Content 3",
        new UserId(otherUserId)
      );
      
      await blogRepository.save(blog1);
      await blogRepository.save(blog2);
      await blogRepository.save(blog3);
      
      // Act
      const result = await getBlogUseCase.getByAuthorId(userId);
      
      // Assert
      expect(result.length).toBe(2);
      expect(result[0].authorId).toBe(userId);
      expect(result[1].authorId).toBe(userId);
    });
    
    it("should return empty array when no blogs found", async () => {
      // Arrange
      const userId = randomUUID();
      
      // Act
      const result = await getBlogUseCase.getByAuthorId(userId);
      
      // Assert
      expect(result).toEqual([]);
    });
  });
  
  describe("getAll", () => {
    it("should return all blogs", async () => {
      // Arrange
      const blog1 = new Blog(
        new BlogId(randomUUID()),
        "Blog 1",
        "Content 1",
        new UserId(randomUUID())
      );
      
      const blog2 = new Blog(
        new BlogId(randomUUID()),
        "Blog 2",
        "Content 2",
        new UserId(randomUUID())
      );
      
      await blogRepository.save(blog1);
      await blogRepository.save(blog2);
      
      // Act
      const result = await getBlogUseCase.getAll();
      
      // Assert
      expect(result.length).toBe(2);
      
      // Check if results contain the expected blogs by title
      const titles = result.map(blog => blog.title);
      expect(titles).toContain("Blog 1");
      expect(titles).toContain("Blog 2");
    });
  });
}); 