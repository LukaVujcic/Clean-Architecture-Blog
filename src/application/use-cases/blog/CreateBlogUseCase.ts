import { inject, injectable } from "inversify";
import { Blog, BlogId } from "../../../domain/entities/Blog";
import { UserId } from "../../../domain/entities/User";
import { BlogRepository } from "../../../domain/ports/BlogRepository";
import { UserRepository } from "../../../domain/ports/UserRepository";
import { BlogResponseDto, CreateBlogDto } from "../../dtos/BlogDto";
import { BlogMapper } from "../../mappers/BlogMapper";
import { randomUUID } from "crypto";
import "reflect-metadata";

@injectable()
export class CreateBlogUseCase {
  constructor(
    @inject("BlogRepository") private blogRepository: BlogRepository,
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  async execute(createBlogDto: CreateBlogDto): Promise<BlogResponseDto> {
    const { title, content, authorId } = createBlogDto;
    
    // Check if user exists
    const userIdObj = new UserId(authorId);
    const user = await this.userRepository.findById(userIdObj);
    
    if (!user) {
      throw new Error("Author not found");
    }
    
    // Create new blog
    const blogId = new BlogId(randomUUID());
    const blog = new Blog(blogId, title, content, userIdObj);
    
    await this.blogRepository.save(blog);
    
    return BlogMapper.toDto(blog);
  }
} 