import { Comment, CommentId } from "../../domain/entities/Comment";
import { UserId } from "../../domain/entities/User";
import { CommentRepository } from "../../domain/ports/CommentRepository";
import "reflect-metadata";
export declare class SequelizeCommentRepository implements CommentRepository {
    findById(id: CommentId): Promise<Comment | null>;
    findByBlogId(blogId: string): Promise<Comment[]>;
    findByUserId(userId: string): Promise<Comment[]>;
    findByAuthorId(authorId: UserId): Promise<Comment[]>;
    findAll(): Promise<Comment[]>;
    save(comment: Comment): Promise<void>;
    delete(id: CommentId): Promise<void>;
    private mapToDomain;
}
