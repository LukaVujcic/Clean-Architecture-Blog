import { injectable } from "inversify";
import { Blog, BlogId } from "../../domain/entities/Blog";
import { UserId } from "../../domain/entities/User";
import { BlogRepository } from "../../domain/ports/BlogRepository";
import BlogModel from "../models/BlogModel";
import "reflect-metadata";

@injectable()
export class SequelizeBlogRepository implements BlogRepository {
  async findById(id: BlogId): Promise<Blog | null> {
    const blogModel = await BlogModel.findByPk(id.toString());
    
    if (!blogModel) {
      return null;
    }
    
    return this.mapToDomain(blogModel);
  }
  
  async findByUserId(userId: string): Promise<Blog[]> {
    const blogModels = await BlogModel.findAll({ 
      where: { authorId: userId } 
    });
    
    return blogModels.map(blogModel => this.mapToDomain(blogModel));
  }
  
  async findAll(): Promise<Blog[]> {
    const blogModels = await BlogModel.findAll();
    
    return blogModels.map(blogModel => this.mapToDomain(blogModel));
  }
  
  async save(blog: Blog): Promise<void> {
    await BlogModel.upsert({
      id: blog.getId().toString(),
      title: blog.getTitle(),
      content: blog.getContent(),
      authorId: blog.getAuthorId().toString(),
      likes: blog.getLikes()
    });
  }
  
  async delete(id: BlogId): Promise<void> {
    await BlogModel.destroy({ where: { id: id.toString() } });
  }
  
  private mapToDomain(blogModel: BlogModel): Blog {
    return new Blog(
      new BlogId(blogModel.id),
      blogModel.title,
      blogModel.content,
      new UserId(blogModel.authorId),
      new Date(blogModel.createdAt),
      new Date(blogModel.updatedAt),
      blogModel.likes
    );
  }
}