import { UserId } from './User';
import { BlogId } from './Blog';

export class CommentId {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  equals(id: CommentId): boolean {
    return this.value === id.value;
  }
}

export class Comment {
  private id: CommentId;
  private content: string;
  private authorId: UserId;
  private blogId: BlogId;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: CommentId,
    content: string,
    authorId: UserId,
    blogId: BlogId,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.content = content;
    this.authorId = authorId;
    this.blogId = blogId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): CommentId {
    return this.id;
  }

  getContent(): string {
    return this.content;
  }

  getAuthorId(): UserId {
    return this.authorId;
  }

  getBlogId(): BlogId {
    return this.blogId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateContent(content: string): void {
    this.content = content;
    this.updatedAt = new Date();
  }
} 