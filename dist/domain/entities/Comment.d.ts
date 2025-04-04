import { UserId } from './User';
import { BlogId } from './Blog';
export declare class CommentId {
    private value;
    constructor(value: string);
    toString(): string;
    equals(id: CommentId): boolean;
}
export declare class Comment {
    private id;
    private content;
    private authorId;
    private blogId;
    private createdAt;
    private updatedAt;
    constructor(id: CommentId, content: string, authorId: UserId, blogId: BlogId, createdAt?: Date, updatedAt?: Date);
    getId(): CommentId;
    getContent(): string;
    getAuthorId(): UserId;
    getBlogId(): BlogId;
    getCreatedAt(): Date;
    getUpdatedAt(): Date;
    updateContent(content: string): void;
}
