import { Like, LikeId } from '../entities/Like';

export interface LikeRepository {
  findById(id: LikeId): Promise<Like | null>;
  findByBlogId(blogId: string): Promise<Like[]>;
  findByUserId(userId: string): Promise<Like[]>;
  findByBlogAndUserId(blogId: string, userId: string): Promise<Like | null>;
  save(like: Like): Promise<void>;
  delete(id: LikeId): Promise<void>;
} 