import { BlogRepository } from "../../../domain/ports/BlogRepository";
import { BlogResponseDto } from "../../dtos/BlogDto";
import "reflect-metadata";
export declare class GetBlogUseCase {
    private blogRepository;
    constructor(blogRepository: BlogRepository);
    getById(id: string): Promise<BlogResponseDto>;
    getByAuthorId(authorId: string): Promise<BlogResponseDto[]>;
    getAll(): Promise<BlogResponseDto[]>;
}
