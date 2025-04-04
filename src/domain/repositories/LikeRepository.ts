import { Like, LikeId } from '../entities/Like';
import { BlogId } from '../entities/Blog';
import { UserId } from '../entities/User';

export interface LikeRepository {
  findById(id: LikeId): Promise<Like | null>;
  findByBlogId(blogId: BlogId): Promise<Like[]>;
  findByUserId(userId: UserId): Promise<Like[]>;
  findByBlogIdAndUserId(blogId: BlogId, userId: UserId): Promise<Like | null>;
  findAll(): Promise<Like[]>;
  save(like: Like): Promise<void>;
  delete(id: LikeId): Promise<void>;
} 