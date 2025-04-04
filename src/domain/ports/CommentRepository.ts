import { Comment, CommentId } from '../entities/Comment';

export interface CommentRepository {
  findById(id: CommentId): Promise<Comment | null>;
  findByBlogId(blogId: string): Promise<Comment[]>;
  findByUserId(userId: string): Promise<Comment[]>;
  save(comment: Comment): Promise<void>;
  delete(id: CommentId): Promise<void>;
} 