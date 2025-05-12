import { UpdateBlogUseCase } from "../../../../src/application/use-cases/blog/UpdateBlogUseCase";
import { FakeBlogRepository } from "../../../fakes/repositories/FakeBlogRepository";
import { Blog, BlogId } from "../../../../src/domain/entities/Blog";
import { UserId } from "../../../../src/domain/entities/User";
import { UpdateBlogDto } from "../../../../src/application/dtos/BlogDto";
import { randomUUID } from "crypto";

describe("UpdateBlogUseCase", () => {
  let updateBlogUseCase: UpdateBlogUseCase;
  let blogRepository: FakeBlogRepository;
  
  beforeEach(() => {
    blogRepository = new FakeBlogRepository();
    updateBlogUseCase = new UpdateBlogUseCase(blogRepository);
  });
  
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
    const result = await updateBlogUseCase.execute(blogId, updateBlogDto);
    
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
    await expect(updateBlogUseCase.execute(blogId, updateBlogDto))
      .rejects.toThrow("Blog not found");
  });
  
  it("should only update specified properties", async () => {
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
      title: "Updated Title"
      // content not specified
    };
    
    // Act
    const result = await updateBlogUseCase.execute(blogId, updateBlogDto);
    
    // Assert
    expect(result).toEqual(expect.objectContaining({
      id: blogId,
      title: "Updated Title",
      content: "Original Content",  // should not be changed
      authorId: userId
    }));
  });
}); 