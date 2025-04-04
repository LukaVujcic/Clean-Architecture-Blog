import { UserId } from './User';
export declare class BlogId {
    private value;
    constructor(value: string);
    toString(): string;
    equals(id: BlogId): boolean;
}
export declare class Blog {
    private id;
    private title;
    private content;
    private authorId;
    private createdAt;
    private updatedAt;
    private likes;
    constructor(id: BlogId, title: string, content: string, authorId: UserId, createdAt?: Date, updatedAt?: Date, likes?: number);
    getId(): BlogId;
    getTitle(): string;
    getContent(): string;
    getAuthorId(): UserId;
    getCreatedAt(): Date;
    getUpdatedAt(): Date;
    getLikes(): number;
    updateTitle(title: string): void;
    updateContent(content: string): void;
    incrementLikes(): void;
    decrementLikes(): void;
}
