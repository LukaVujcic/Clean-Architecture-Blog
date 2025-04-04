import { UserId } from './User';

export class BlogId {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  equals(id: BlogId): boolean {
    return this.value === id.value;
  }
}

export class Blog {
  private id: BlogId;
  private title: string;
  private content: string;
  private authorId: UserId;
  private createdAt: Date;
  private updatedAt: Date;
  private likes: number;

  constructor(
    id: BlogId,
    title: string,
    content: string,
    authorId: UserId,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    likes: number = 0
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.likes = likes;
  }

  getId(): BlogId {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getContent(): string {
    return this.content;
  }

  getAuthorId(): UserId {
    return this.authorId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getLikes(): number {
    return this.likes;
  }

  updateTitle(title: string): void {
    this.title = title;
    this.updatedAt = new Date();
  }

  updateContent(content: string): void {
    this.content = content;
    this.updatedAt = new Date();
  }

  incrementLikes(): void {
    this.likes += 1;
  }

  decrementLikes(): void {
    if (this.likes > 0) {
      this.likes -= 1;
    }
  }
} 