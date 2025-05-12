import { BlogRepository } from "../../../domain/ports/BlogRepository";
import { BlogResponseDto, UpdateBlogDto } from "../../dtos/BlogDto";
import "reflect-metadata";
export declare class UpdateBlogUseCase {
    private blogRepository;
    constructor(blogRepository: BlogRepository);
    execute(id: string, updateBlogDto: UpdateBlogDto): Promise<BlogResponseDto>;
}
