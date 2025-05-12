import { inject, injectable } from "inversify";
import { Blog, BlogId } from "../../../domain/entities/Blog";
import { UserId } from "../../../domain/entities/User";
import { BlogRepository } from "../../../domain/ports/BlogRepository";
import { BlogResponseDto } from "../../dtos/BlogDto";
import { BlogMapper } from "../../mappers/BlogMapper";
import "reflect-metadata";

@injectable()
export class GetBlogUseCase {
  constructor(
    @inject("BlogRepository") private blogRepository: BlogRepository
  ) {}

  async getById(id: string): Promise<BlogResponseDto> {
    const blogId = new BlogId(id);
    const blog = await this.blogRepository.findById(blogId);
    
    if (!blog) {
      throw new Error("Blog not found");
    }
    
    return BlogMapper.toDto(blog);
  }

  async getByAuthorId(authorId: string): Promise<BlogResponseDto[]> {
    const blogs = await this.blogRepository.findByUserId(authorId);
    return blogs.map((blog: Blog) => BlogMapper.toDto(blog));
  }

  async getAll(): Promise<BlogResponseDto[]> {
    const blogs = await this.blogRepository.findAll();
    return blogs.map((blog: Blog) => BlogMapper.toDto(blog));
  }
} 