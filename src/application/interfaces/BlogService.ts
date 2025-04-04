import { BlogResponseDto, CreateBlogDto, UpdateBlogDto } from "../dtos/BlogDto";

export interface BlogService {
  createBlog(createBlogDto: CreateBlogDto): Promise<BlogResponseDto>;
  getBlogById(id: string): Promise<BlogResponseDto>;
  getBlogsByAuthorId(authorId: string): Promise<BlogResponseDto[]>;
  getAllBlogs(): Promise<BlogResponseDto[]>;
  updateBlog(id: string, updateBlogDto: UpdateBlogDto): Promise<BlogResponseDto>;
  deleteBlog(id: string): Promise<void>;
} 