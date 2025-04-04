import { BlogServiceImpl } from "../../../src/application/services/BlogServiceImpl";
import { FakeBlogRepository } from "../../fakes/repositories/FakeBlogRepository";
import { FakeUserRepository } from "../../fakes/repositories/FakeUserRepository";
import { Blog, BlogId } from "../../../src/domain/entities/Blog";
import { User, UserId } from "../../../src/domain/entities/User";
import { CreateBlogDto, UpdateBlogDto } from "../../../src/application/dtos/BlogDto";
import { randomUUID } from "crypto";

describe("BlogServiceImpl", () => {
  let blogService: BlogServiceImpl;
  let blogRepository: FakeBlogRepository;
  let userRepository: FakeUserRepository;
  
  beforeEach(() => {
    blogRepository = new FakeBlogRepository();
    userRepository = new FakeUserRepository();
    blogService = new BlogServiceImpl(blogRepository, userRepository);
  });
  
  describe("createBlog", () => {
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
      const result = await blogService.createBlog(createBlogDto);
      
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
      await expect(blogService.createBlog(createBlogDto))
        .rejects.toThrow("Author not found");
    });
  });
  
  describe("getBlogById", () => {
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
      const result = await blogService.getBlogById(blogId);
      
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
      await expect(blogService.getBlogById(blogId))
        .rejects.toThrow("Blog not found");
    });
  });
  
  describe("getBlogsByAuthorId", () => {
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
      const result = await blogService.getBlogsByAuthorId(userId);
      
      // Assert
      expect(result.length).toBe(2);
      expect(result[0].authorId).toBe(userId);
      expect(result[1].authorId).toBe(userId);
    });
    
    it("should return empty array when no blogs found", async () => {
      // Arrange
      const userId = randomUUID();
      
      // Act
      const result = await blogService.getBlogsByAuthorId(userId);
      
      // Assert
      expect(result).toEqual([]);
    });
  });
  
  describe("updateBlog", () => {
    it("should update blog properties", async () => {
      // Arrange
      const blogId = randomUUID();
      const userId = randomUUID();
      const blog = new Blog(
        new BlogId(blogId),
        "Original Title",
        "Original Content",
        new UserId(userId)
      );
      
      await blogRepository.save(blog);
      
      const updateBlogDto: UpdateBlogDto = {
        title: "Updated Title",
        content: "Updated Content"
      };
      
      // Act
      const result = await blogService.updateBlog(blogId, updateBlogDto);
      
      // Assert
      expect(result).toEqual(expect.objectContaining({
        id: blogId,
        title: "Updated Title",
        content: "Updated Content",
        authorId: userId
      }));
      
      // Verify blog was updated in repository
      const updatedBlog = await blogRepository.findById(new BlogId(blogId));
      expect(updatedBlog?.getTitle()).toBe("Updated Title");
      expect(updatedBlog?.getContent()).toBe("Updated Content");
    });
    
    it("should throw error when blog not found", async () => {
      // Arrange
      const blogId = "nonexistent";
      const updateBlogDto: UpdateBlogDto = {
        title: "Updated Title"
      };
      
      // Act & Assert
      await expect(blogService.updateBlog(blogId, updateBlogDto))
        .rejects.toThrow("Blog not found");
    });
  });
  
  describe("deleteBlog", () => {
    it("should delete blog from repository", async () => {
      // Arrange
      const blogId = randomUUID();
      const userId = randomUUID();
      const user = new User(new UserId(userId), "testuser", "test@example.com", "password123");
      await userRepository.save(user);
      
      const blog = new Blog(
        new BlogId(blogId),
        "Test Blog",
        "This is a test blog",
        new UserId(userId)
      );
      
      await blogRepository.save(blog);
      
      // Verify blog exists before deletion
      const blogBeforeDeletion = await blogRepository.findById(new BlogId(blogId));
      expect(blogBeforeDeletion).not.toBeNull();
      
      // Act
      await blogService.deleteBlog(blogId);
      
      // Assert
      const blogAfterDeletion = await blogRepository.findById(new BlogId(blogId));
      expect(blogAfterDeletion).toBeNull();
    });
    
    it("should throw error when blog not found", async () => {
      // Arrange
      const nonExistentBlogId = randomUUID();
      
      // Act & Assert
      await expect(blogService.deleteBlog(nonExistentBlogId))
        .rejects.toThrow("Blog not found");
    });
  });
}); 