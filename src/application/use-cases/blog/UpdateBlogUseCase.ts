import { inject, injectable } from "inversify";
import { BlogId } from "../../../domain/entities/Blog";
import { BlogRepository } from "../../../domain/ports/BlogRepository";
import { BlogResponseDto, UpdateBlogDto } from "../../dtos/BlogDto";
import { BlogMapper } from "../../mappers/BlogMapper";
import "reflect-metadata";

@injectable()
export class UpdateBlogUseCase {
  constructor(
    @inject("BlogRepository") private blogRepository: BlogRepository
  ) {}

  async execute(id: string, updateBlogDto: UpdateBlogDto): Promise<BlogResponseDto> {
    const blogId = new BlogId(id);
    const blog = await this.blogRepository.findById(blogId);
    
    if (!blog) {
      throw new Error("Blog not found");
    }
    
    // Update blog properties
    if (updateBlogDto.title) {
      blog.updateTitle(updateBlogDto.title);
    }
    
    if (updateBlogDto.content) {
      blog.updateContent(updateBlogDto.content);
    }
    
    await this.blogRepository.save(blog);
    
    return BlogMapper.toDto(blog);
  }
} 