import { Blog, BlogId } from '../entities/Blog';
import { UserId } from '../entities/User';

export interface BlogRepository {
  findById(id: BlogId): Promise<Blog | null>;
  findByAuthorId(authorId: UserId): Promise<Blog[]>;
  findAll(): Promise<Blog[]>;
  save(blog: Blog): Promise<void>;
  delete(id: BlogId): Promise<void>;
} 