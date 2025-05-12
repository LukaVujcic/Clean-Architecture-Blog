import { Like, LikeId } from "../../domain/entities/Like";
import { LikeRepository } from "../../domain/ports/LikeRepository";
import "reflect-metadata";
export declare class SequelizeLikeRepository implements LikeRepository {
    findById(id: LikeId): Promise<Like | null>;
    findByBlogId(blogId: string): Promise<Like[]>;
    findByUserId(userId: string): Promise<Like[]>;
    findByBlogAndUserId(blogId: string, userId: string): Promise<Like | null>;
    save(like: Like): Promise<void>;
    delete(id: LikeId): Promise<void>;
    private mapToDomain;
}
