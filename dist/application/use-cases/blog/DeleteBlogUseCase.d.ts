import { BlogRepository } from "../../../domain/ports/BlogRepository";
import "reflect-metadata";
export declare class DeleteBlogUseCase {
    private blogRepository;
    constructor(blogRepository: BlogRepository);
    execute(id: string): Promise<void>;
}
