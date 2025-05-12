import { inject, injectable } from "inversify";
import { BlogId } from "../../../domain/entities/Blog";
import { BlogRepository } from "../../../domain/ports/BlogRepository";
import "reflect-metadata";

@injectable()
export class DeleteBlogUseCase {
  constructor(
    @inject("BlogRepository") private blogRepository: BlogRepository
  ) {}

  async execute(id: string): Promise<void> {
    const blogId = new BlogId(id);
    const blog = await this.blogRepository.findById(blogId);
    
    if (!blog) {
      throw new Error("Blog not found");
    }
    
    await this.blogRepository.delete(blogId);
  }
} 