import { LikeRepository } from "../../../src/domain/ports/LikeRepository";
import { Like, LikeId } from "../../../src/domain/entities/Like";

export class FakeLikeRepository implements LikeRepository {
  private likes: Map<string, Like> = new Map();

  async findById(id: LikeId): Promise<Like | null> {
    const like = this.likes.get(id.toString());
    return like || null;
  }

  async findByBlogId(blogId: string): Promise<Like[]> {
    return Array.from(this.likes.values()).filter(
      like => like.getBlogId().toString() === blogId
    );
  }

  async findByUserId(userId: string): Promise<Like[]> {
    return Array.from(this.likes.values()).filter(
      like => like.getUserId().toString() === userId
    );
  }

  async findByBlogAndUserId(blogId: string, userId: string): Promise<Like | null> {
    for (const like of this.likes.values()) {
      if (
        like.getBlogId().toString() === blogId &&
        like.getUserId().toString() === userId
      ) {
        return like;
      }
    }
    return null;
  }

  async save(like: Like): Promise<void> {
    this.likes.set(like.getId().toString(), like);
  }

  async delete(id: LikeId): Promise<void> {
    this.likes.delete(id.toString());
  }

  // Helper methods for testing
  clear(): void {
    this.likes.clear();
  }
} 