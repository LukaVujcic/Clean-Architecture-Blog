import { BlogRepository } from "../../domain/ports/BlogRepository";
import { UserRepository } from "../../domain/ports/UserRepository";
import { BlogResponseDto, CreateBlogDto, UpdateBlogDto } from "../dtos/BlogDto";
import { BlogService } from "../interfaces/BlogService";
import "reflect-metadata";
export declare class BlogServiceImpl implements BlogService {
    private blogRepository;
    private userRepository;
    constructor(blogRepository: BlogRepository, userRepository: UserRepository);
    createBlog(createBlogDto: CreateBlogDto): Promise<BlogResponseDto>;
    getBlogById(id: string): Promise<BlogResponseDto>;
    getBlogsByAuthorId(authorId: string): Promise<BlogResponseDto[]>;
    getAllBlogs(): Promise<BlogResponseDto[]>;
    updateBlog(id: string, updateBlogDto: UpdateBlogDto): Promise<BlogResponseDto>;
    deleteBlog(id: string): Promise<void>;
    private mapBlogToDto;
}
