"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.CommentId = void 0;
class CommentId {
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
exports.CommentId = CommentId;
class Comment {
    constructor(id, content, authorId, blogId, createdAt = new Date(), updatedAt = new Date()) {
        this.id = id;
        this.content = content;
        this.authorId = authorId;
        this.blogId = blogId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    getId() {
        return this.id;
    }
    getContent() {
        return this.content;
    }
    getAuthorId() {
        return this.authorId;
    }
    getBlogId() {
        return this.blogId;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    updateContent(content) {
        this.content = content;
        this.updatedAt = new Date();
    }
}
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map