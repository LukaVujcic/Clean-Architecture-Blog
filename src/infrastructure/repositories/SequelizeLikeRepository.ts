import { injectable } from "inversify";
import { BlogId } from "../../domain/entities/Blog";
import { Like, LikeId } from "../../domain/entities/Like";
import { UserId } from "../../domain/entities/User";
import { LikeRepository } from "../../domain/ports/LikeRepository";
import LikeModel from "../models/LikeModel";
import "reflect-metadata";

@injectable()
export class SequelizeLikeRepository implements LikeRepository {
  async findById(id: LikeId): Promise<Like | null> {
    const likeModel = await LikeModel.findByPk(id.toString());
    
    if (!likeModel) {
      return null;
    }
    
    return this.mapToDomain(likeModel);
  }
  
  async findByBlogId(blogId: string): Promise<Like[]> {
    const likeModels = await LikeModel.findAll({ 
      where: { blogId } 
    });
    
    return likeModels.map(likeModel => this.mapToDomain(likeModel));
  }
  
  async findByUserId(userId: string): Promise<Like[]> {
    const likeModels = await LikeModel.findAll({ 
      where: { userId } 
    });
    
    return likeModels.map(likeModel => this.mapToDomain(likeModel));
  }
  
  async findByBlogAndUserId(blogId: string, userId: string): Promise<Like | null> {
    const likeModel = await LikeModel.findOne({ 
      where: { 
        blogId,
        userId
      } 
    });
    
    if (!likeModel) {
      return null;
    }
    
    return this.mapToDomain(likeModel);
  }
  
  async save(like: Like): Promise<void> {
    await LikeModel.upsert({
      id: like.getId().toString(),
      userId: like.getUserId().toString(),
      blogId: like.getBlogId().toString()
    });
  }
  
  async delete(id: LikeId): Promise<void> {
    await LikeModel.destroy({ where: { id: id.toString() } });
  }
  
  private mapToDomain(likeModel: LikeModel): Like {
    return new Like(
      new LikeId(likeModel.id),
      new UserId(likeModel.userId),
      new BlogId(likeModel.blogId),
      new Date(likeModel.createdAt)
    );
  }
} 