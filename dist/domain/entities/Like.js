"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = exports.LikeId = void 0;
class LikeId {
    constructor(value) {
        this.value = value;
    }
    toString() {
        return this.value;
    }
    equals(id) {
        return this.value === id.value;
    }
}
exports.LikeId = LikeId;
class Like {
    constructor(id, userId, blogId, createdAt = new Date()) {
        this.id = id;
        this.userId = userId;
        this.blogId = blogId;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    getUserId() {
        return this.userId;
    }
    getBlogId() {
        return this.blogId;
    }
    getCreatedAt() {
        return this.createdAt;
    }
}
exports.Like = Like;
//# sourceMappingURL=Like.js.map