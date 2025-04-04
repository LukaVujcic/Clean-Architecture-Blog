import { BlogRepository } from "../../../src/domain/ports/BlogRepository";
import { Blog, BlogId } from "../../../src/domain/entities/Blog";

export class FakeBlogRepository implements BlogRepository {
  private blogs: Map<string, Blog> = new Map();

  async findById(id: BlogId): Promise<Blog | null> {
    const blog = this.blogs.get(id.toString());
    return blog || null;
  }

  async findByUserId(userId: string): Promise<Blog[]> {
    return Array.from(this.blogs.values()).filter(
      blog => blog.getAuthorId().toString() === userId
    );
  }

  async findAll(): Promise<Blog[]> {
    return Array.from(this.blogs.values());
  }

  async save(blog: Blog): Promise<void> {
    this.blogs.set(blog.getId().toString(), blog);
  }

  async delete(id: BlogId): Promise<void> {
    this.blogs.delete(id.toString());
  }

  // Helper methods for testing
  clear(): void {
    this.blogs.clear();
  }
} 