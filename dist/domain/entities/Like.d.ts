import { UserId } from './User';
import { BlogId } from './Blog';
export declare class LikeId {
    private value;
    constructor(value: string);
    toString(): string;
    equals(id: LikeId): boolean;
}
export declare class Like {
    private id;
    private userId;
    private blogId;
    private createdAt;
    constructor(id: LikeId, userId: UserId, blogId: BlogId, createdAt?: Date);
    getId(): LikeId;
    getUserId(): UserId;
    getBlogId(): BlogId;
    getCreatedAt(): Date;
}
