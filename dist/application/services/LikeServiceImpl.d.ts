import { BlogRepository } from "../../domain/repositories/BlogRepository";
import { LikeRepository } from "../../domain/repositories/LikeRepository";
import { CreateLikeDto, LikeResponseDto } from "../dtos/LikeDto";
import { LikeService } from "../interfaces/LikeService";
import "reflect-metadata";
export declare class LikeServiceImpl implements LikeService {
    private likeRepository;
    private blogRepository;
    constructor(likeRepository: LikeRepository, blogRepository: BlogRepository);
    createLike(createLikeDto: CreateLikeDto): Promise<LikeResponseDto>;
    getLikeById(id: string): Promise<LikeResponseDto>;
    getLikesByBlogId(blogId: string): Promise<LikeResponseDto[]>;
    getLikesByUserId(userId: string): Promise<LikeResponseDto[]>;
    getLikeByBlogIdAndUserId(blogId: string, userId: string): Promise<LikeResponseDto | null>;
    getAllLikes(): Promise<LikeResponseDto[]>;
    deleteLike(id: string): Promise<void>;
    toggleLike(blogId: string, userId: string): Promise<boolean>;
    private mapLikeToDto;
}
