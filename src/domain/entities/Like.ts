import { UserId } from './User';
import { BlogId } from './Blog';

export class LikeId {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  equals(id: LikeId): boolean {
    return this.value === id.value;
  }
}

export class Like {
  private id: LikeId;
  private userId: UserId;
  private blogId: BlogId;
  private createdAt: Date;

  constructor(
    id: LikeId,
    userId: UserId,
    blogId: BlogId,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.userId = userId;
    this.blogId = blogId;
    this.createdAt = createdAt;
  }

  getId(): LikeId {
    return this.id;
  }

  getUserId(): UserId {
    return this.userId;
  }

  getBlogId(): BlogId {
    return this.blogId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
} 