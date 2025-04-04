import { Blog, BlogId } from '../entities/Blog';

export interface BlogRepository {
  findById(id: BlogId): Promise<Blog | null>;
  findByUserId(userId: string): Promise<Blog[]>;
  findAll(): Promise<Blog[]>;
  save(blog: Blog): Promise<void>;
  delete(id: BlogId): Promise<void>;
} 