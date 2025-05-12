import { injectable } from "inversify";
import { BlogId } from "../../domain/entities/Blog";
import { Comment, CommentId } from "../../domain/entities/Comment";
import { UserId } from "../../domain/entities/User";
import { CommentRepository } from "../../domain/ports/CommentRepository";
import CommentModel from "../models/CommentModel";
import "reflect-metadata";

@injectable()
export class SequelizeCommentRepository implements CommentRepository {
  async findById(id: CommentId): Promise<Comment | null> {
    const commentModel = await CommentModel.findByPk(id.toString());
    
    if (!commentModel) {
      return null;
    }
    
    return this.mapToDomain(commentModel);
  }
  
  async findByBlogId(blogId: string): Promise<Comment[]> {
    const commentModels = await CommentModel.findAll({ 
      where: { blogId } 
    });
    
    return commentModels.map(commentModel => this.mapToDomain(commentModel));
  }
  
  async findByUserId(userId: string): Promise<Comment[]> {
    const commentModels = await CommentModel.findAll({ 
      where: { authorId: userId } 
    });
    
    return commentModels.map(commentModel => this.mapToDomain(commentModel));
  }
  
  async findAll(): Promise<Comment[]> {
    const commentModels = await CommentModel.findAll();
    
    return commentModels.map(commentModel => this.mapToDomain(commentModel));
  }
  
  async save(comment: Comment): Promise<void> {
    await CommentModel.upsert({
      id: comment.getId().toString(),
      content: comment.getContent(),
      authorId: comment.getAuthorId().toString(),
      blogId: comment.getBlogId().toString()
    });
  }
  
  async delete(id: CommentId): Promise<void> {
    await CommentModel.destroy({ where: { id: id.toString() } });
  }
  
  private mapToDomain(commentModel: CommentModel): Comment {
    return new Comment(
      new CommentId(commentModel.id),
      commentModel.content,
      new UserId(commentModel.authorId),
      new BlogId(commentModel.blogId),
      new Date(commentModel.createdAt),
      new Date(commentModel.updatedAt)
    );
  }
} 