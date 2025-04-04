import { Comment, CommentId } from '../entities/Comment';
import { BlogId } from '../entities/Blog';
import { UserId } from '../entities/User';
export interface CommentRepository {
    findById(id: CommentId): Promise<Comment | null>;
    findByBlogId(blogId: BlogId): Promise<Comment[]>;
    findByAuthorId(authorId: UserId): Promise<Comment[]>;
    findAll(): Promise<Comment[]>;
    save(comment: Comment): Promise<void>;
    delete(id: CommentId): Promise<void>;
}
