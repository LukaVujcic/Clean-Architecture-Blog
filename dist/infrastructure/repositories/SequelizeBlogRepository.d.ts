import { Blog, BlogId } from "../../domain/entities/Blog";
import { UserId } from "../../domain/entities/User";
import { BlogRepository } from "../../domain/ports/BlogRepository";
import "reflect-metadata";
export declare class SequelizeBlogRepository implements BlogRepository {
    findById(id: BlogId): Promise<Blog | null>;
    findByUserId(userId: string): Promise<Blog[]>;
    findByAuthorId(authorId: UserId): Promise<Blog[]>;
    findAll(): Promise<Blog[]>;
    save(blog: Blog): Promise<void>;
    delete(id: BlogId): Promise<void>;
    private mapToDomain;
}
