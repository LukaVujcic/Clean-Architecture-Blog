import { inject, injectable } from "inversify";
import { BlogId } from "../../domain/entities/Blog";
import { Like, LikeId } from "../../domain/entities/Like";
import { UserId } from "../../domain/entities/User";
import { BlogRepository } from "../../domain/repositories/BlogRepository";
import { LikeRepository } from "../../domain/repositories/LikeRepository";
import { CreateLikeDto, LikeResponseDto } from "../dtos/LikeDto";
import { LikeService } from "../interfaces/LikeService";
import { randomUUID } from "crypto";
import "reflect-metadata";

@injectable()
export class LikeServiceImpl implements LikeService {
  constructor(
    @inject("LikeRepository") private likeRepository: LikeRepository,
    @inject("BlogRepository") private blogRepository: BlogRepository
  ) {}

  async createLike(createLikeDto: CreateLikeDto): Promise<LikeResponseDto> {
    const { userId, blogId } = createLikeDto;
    
    // Check if like already exists
    const blogIdObj = new BlogId(blogId);
    const userIdObj = new UserId(userId);
    const existingLike = await this.likeRepository.findByBlogIdAndUserId(blogIdObj, userIdObj);
    
    if (existingLike) {
      throw new Error("User has already liked this blog");
    }
    
    // Create new like
    const likeId = new LikeId(randomUUID());
    const like = new Like(likeId, userIdObj, blogIdObj);
    
    await this.likeRepository.save(like);
    
    // Update blog likes count
    const blog = await this.blogRepository.findById(blogIdObj);
    if (blog) {
      blog.incrementLikes();
      await this.blogRepository.save(blog);
    }
    
    return this.mapLikeToDto(like);
  }

  async getLikeById(id: string): Promise<LikeResponseDto> {
    const likeId = new LikeId(id);
    const like = await this.likeRepository.findById(likeId);
    
    if (!like) {
      throw new Error("Like not found");
    }
    
    return this.mapLikeToDto(like);
  }

  async getLikesByBlogId(blogId: string): Promise<LikeResponseDto[]> {
    const blogIdObj = new BlogId(blogId);
    const likes = await this.likeRepository.findByBlogId(blogIdObj);
    
    return likes.map(like => this.mapLikeToDto(like));
  }

  async getLikesByUserId(userId: string): Promise<LikeResponseDto[]> {
    const userIdObj = new UserId(userId);
    const likes = await this.likeRepository.findByUserId(userIdObj);
    
    return likes.map(like => this.mapLikeToDto(like));
  }

  async getLikeByBlogIdAndUserId(blogId: string, userId: string): Promise<LikeResponseDto | null> {
    const blogIdObj = new BlogId(blogId);
    const userIdObj = new UserId(userId);
    const like = await this.likeRepository.findByBlogIdAndUserId(blogIdObj, userIdObj);
    
    if (!like) {
      return null;
    }
    
    return this.mapLikeToDto(like);
  }

  async getAllLikes(): Promise<LikeResponseDto[]> {
    const likes = await this.likeRepository.findAll();
    return likes.map(like => this.mapLikeToDto(like));
  }

  async deleteLike(id: string): Promise<void> {
    const likeId = new LikeId(id);
    const like = await this.likeRepository.findById(likeId);
    
    if (like) {
      // Update blog likes count
      const blog = await this.blogRepository.findById(like.getBlogId());
      if (blog) {
        blog.decrementLikes();
        await this.blogRepository.save(blog);
      }
    }
    
    await this.likeRepository.delete(likeId);
  }

  async toggleLike(blogId: string, userId: string): Promise<boolean> {
    const blogIdObj = new BlogId(blogId);
    const userIdObj = new UserId(userId);
    
    const existingLike = await this.likeRepository.findByBlogIdAndUserId(blogIdObj, userIdObj);
    
    if (existingLike) {
      // Unlike the blog
      await this.deleteLike(existingLike.getId().toString());
      return false;
    } else {
      // Like the blog
      await this.createLike({ userId, blogId });
      return true;
    }
  }

  private mapLikeToDto(like: Like): LikeResponseDto {
    return {
      id: like.getId().toString(),
      userId: like.getUserId().toString(),
      blogId: like.getBlogId().toString(),
      createdAt: like.getCreatedAt().toISOString()
    };
  }
} 