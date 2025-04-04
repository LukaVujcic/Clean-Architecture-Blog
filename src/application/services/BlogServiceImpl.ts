import { inject, injectable } from "inversify";
import { Blog, BlogId } from "../../domain/entities/Blog";
import { UserId } from "../../domain/entities/User";
import { BlogRepository } from "../../domain/ports/BlogRepository";
import { UserRepository } from "../../domain/ports/UserRepository";
import { BlogResponseDto, CreateBlogDto, UpdateBlogDto } from "../dtos/BlogDto";
import { BlogService } from "../interfaces/BlogService";
import { randomUUID } from "crypto";
import "reflect-metadata";

@injectable()
export class BlogServiceImpl implements BlogService {
  constructor(
    @inject("BlogRepository") private blogRepository: BlogRepository,
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  async createBlog(createBlogDto: CreateBlogDto): Promise<BlogResponseDto> {
    const { title, content, authorId } = createBlogDto;
    
    // Check if author exists
    const userId = new UserId(authorId);
    const author = await this.userRepository.findById(userId);
    
    if (!author) {
      throw new Error("Author not found");
    }
    
    const blogId = new BlogId(randomUUID());
    const blog = new Blog(blogId, title, content, userId);
    
    await this.blogRepository.save(blog);
    
    return this.mapBlogToDto(blog);
  }

  async getBlogById(id: string): Promise<BlogResponseDto> {
    const blogId = new BlogId(id);
    const blog = await this.blogRepository.findById(blogId);
    
    if (!blog) {
      throw new Error("Blog not found");
    }
    
    return this.mapBlogToDto(blog);
  }

  async getBlogsByAuthorId(authorId: string): Promise<BlogResponseDto[]> {
    const blogs = await this.blogRepository.findByUserId(authorId);
    
    return blogs.map(blog => this.mapBlogToDto(blog));
  }

  async getAllBlogs(): Promise<BlogResponseDto[]> {
    const blogs = await this.blogRepository.findAll();
    return blogs.map(blog => this.mapBlogToDto(blog));
  }

  async updateBlog(id: string, updateBlogDto: UpdateBlogDto): Promise<BlogResponseDto> {
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
    
    return this.mapBlogToDto(blog);
  }

  async deleteBlog(id: string): Promise<void> {
    const blogId = new BlogId(id);
    const blog = await this.blogRepository.findById(blogId);
    
    if (!blog) {
      throw new Error("Blog not found");
    }
    
    await this.blogRepository.delete(blogId);
  }

  private mapBlogToDto(blog: Blog): BlogResponseDto {
    return {
      id: blog.getId().toString(),
      title: blog.getTitle(),
      content: blog.getContent(),
      authorId: blog.getAuthorId().toString(),
      createdAt: blog.getCreatedAt().toISOString(),
      updatedAt: blog.getUpdatedAt().toISOString(),
      likes: blog.getLikes()
    };
  }
} 