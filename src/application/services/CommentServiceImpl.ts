import { inject, injectable } from "inversify";
import { BlogId } from "../../domain/entities/Blog";
import { Comment, CommentId } from "../../domain/entities/Comment";
import { UserId } from "../../domain/entities/User";
import { CommentRepository } from "../../domain/repositories/CommentRepository";
import { CommentResponseDto, CreateCommentDto, UpdateCommentDto } from "../dtos/CommentDto";
import { CommentService } from "../interfaces/CommentService";
import { randomUUID } from "crypto";
import "reflect-metadata";

@injectable()
export class CommentServiceImpl implements CommentService {
  constructor(
    @inject("CommentRepository") private commentRepository: CommentRepository
  ) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<CommentResponseDto> {
    const { content, authorId, blogId } = createCommentDto;
    
    const commentId = new CommentId(randomUUID());
    const userId = new UserId(authorId);
    const blogIdObj = new BlogId(blogId);
    const comment = new Comment(commentId, content, userId, blogIdObj);
    
    await this.commentRepository.save(comment);
    
    return this.mapCommentToDto(comment);
  }

  async getCommentById(id: string): Promise<CommentResponseDto> {
    const commentId = new CommentId(id);
    const comment = await this.commentRepository.findById(commentId);
    
    if (!comment) {
      throw new Error("Comment not found");
    }
    
    return this.mapCommentToDto(comment);
  }

  async getCommentsByBlogId(blogId: string): Promise<CommentResponseDto[]> {
    const blogIdObj = new BlogId(blogId);
    const comments = await this.commentRepository.findByBlogId(blogIdObj);
    
    return comments.map(comment => this.mapCommentToDto(comment));
  }

  async getCommentsByAuthorId(authorId: string): Promise<CommentResponseDto[]> {
    const userId = new UserId(authorId);
    const comments = await this.commentRepository.findByAuthorId(userId);
    
    return comments.map(comment => this.mapCommentToDto(comment));
  }

  async getAllComments(): Promise<CommentResponseDto[]> {
    const comments = await this.commentRepository.findAll();
    return comments.map(comment => this.mapCommentToDto(comment));
  }

  async updateComment(id: string, updateCommentDto: UpdateCommentDto): Promise<CommentResponseDto> {
    const commentId = new CommentId(id);
    const comment = await this.commentRepository.findById(commentId);
    
    if (!comment) {
      throw new Error("Comment not found");
    }
    
    comment.updateContent(updateCommentDto.content);
    
    await this.commentRepository.save(comment);
    
    return this.mapCommentToDto(comment);
  }

  async deleteComment(id: string): Promise<void> {
    const commentId = new CommentId(id);
    await this.commentRepository.delete(commentId);
  }

  private mapCommentToDto(comment: Comment): CommentResponseDto {
    return {
      id: comment.getId().toString(),
      content: comment.getContent(),
      authorId: comment.getAuthorId().toString(),
      blogId: comment.getBlogId().toString(),
      createdAt: comment.getCreatedAt().toISOString(),
      updatedAt: comment.getUpdatedAt().toISOString()
    };
  }
} 