import { DeleteBlogUseCase } from "../../../../src/application/use-cases/blog/DeleteBlogUseCase";
import { FakeBlogRepository } from "../../../fakes/repositories/FakeBlogRepository";
import { Blog, BlogId } from "../../../../src/domain/entities/Blog";
import { UserId } from "../../../../src/domain/entities/User";
import { randomUUID } from "crypto";

describe("DeleteBlogUseCase", () => {
  let deleteBlogUseCase: DeleteBlogUseCase;
  let blogRepository: FakeBlogRepository;
  
  beforeEach(() => {
    blogRepository = new FakeBlogRepository();
    deleteBlogUseCase = new DeleteBlogUseCase(blogRepository);
  });
  
  it("should delete blog from repository", async () => {
    // Arrange
    const blogId = randomUUID();
    const blog = new Blog(
      new BlogId(blogId),
      "Test Blog",
      "This is a test blog",
      new UserId(randomUUID())
    );
    
    await blogRepository.save(blog);
    
    // Act
    await deleteBlogUseCase.execute(blogId);
    
    // Assert
    const deletedBlog = await blogRepository.findById(new BlogId(blogId));
    expect(deletedBlog).toBeNull();
  });
}); 