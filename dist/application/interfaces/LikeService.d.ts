import { CreateLikeDto, LikeResponseDto } from "../dtos/LikeDto";
export interface LikeService {
    createLike(createLikeDto: CreateLikeDto): Promise<LikeResponseDto>;
    getLikeById(id: string): Promise<LikeResponseDto>;
    getLikesByBlogId(blogId: string): Promise<LikeResponseDto[]>;
    getLikesByUserId(userId: string): Promise<LikeResponseDto[]>;
    getLikeByBlogIdAndUserId(blogId: string, userId: string): Promise<LikeResponseDto | null>;
    getAllLikes(): Promise<LikeResponseDto[]>;
    deleteLike(id: string): Promise<void>;
    toggleLike(blogId: string, userId: string): Promise<boolean>;
}
