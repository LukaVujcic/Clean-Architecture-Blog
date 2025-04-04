"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = exports.BlogId = void 0;
class BlogId {
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
exports.BlogId = BlogId;
class Blog {
    constructor(id, title, content, authorId, createdAt = new Date(), updatedAt = new Date(), likes = 0) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.likes = likes;
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getContent() {
        return this.content;
    }
    getAuthorId() {
        return this.authorId;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    getLikes() {
        return this.likes;
    }
    updateTitle(title) {
        this.title = title;
        this.updatedAt = new Date();
    }
    updateContent(content) {
        this.content = content;
        this.updatedAt = new Date();
    }
    incrementLikes() {
        this.likes += 1;
    }
    decrementLikes() {
        if (this.likes > 0) {
            this.likes -= 1;
        }
    }
}
exports.Blog = Blog;
//# sourceMappingURL=Blog.js.map