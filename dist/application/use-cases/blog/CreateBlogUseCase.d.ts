import { BlogRepository } from "../../../domain/ports/BlogRepository";
import { UserRepository } from "../../../domain/ports/UserRepository";
import { BlogResponseDto, CreateBlogDto } from "../../dtos/BlogDto";
import "reflect-metadata";
export declare class CreateBlogUseCase {
    private blogRepository;
    private userRepository;
    constructor(blogRepository: BlogRepository, userRepository: UserRepository);
    execute(createBlogDto: CreateBlogDto): Promise<BlogResponseDto>;
}
