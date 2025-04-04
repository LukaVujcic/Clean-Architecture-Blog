"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentServiceImpl = void 0;
const inversify_1 = require("inversify");
const Blog_1 = require("../../domain/entities/Blog");
const Comment_1 = require("../../domain/entities/Comment");
const User_1 = require("../../domain/entities/User");
const crypto_1 = require("crypto");
require("reflect-metadata");
let CommentServiceImpl = class CommentServiceImpl {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async createComment(createCommentDto) {
        const { content, authorId, blogId } = createCommentDto;
        const commentId = new Comment_1.CommentId((0, crypto_1.randomUUID)());
        const userId = new User_1.UserId(authorId);
        const blogIdObj = new Blog_1.BlogId(blogId);
        const comment = new Comment_1.Comment(commentId, content, userId, blogIdObj);
        await this.commentRepository.save(comment);
        return this.mapCommentToDto(comment);
    }
    async getCommentById(id) {
        const commentId = new Comment_1.CommentId(id);
        const comment = await this.commentRepository.findById(commentId);
        if (!comment) {
            throw new Error("Comment not found");
        }
        return this.mapCommentToDto(comment);
    }
    async getCommentsByBlogId(blogId) {
        const blogIdObj = new Blog_1.BlogId(blogId);
        const comments = await this.commentRepository.findByBlogId(blogIdObj);
        return comments.map(comment => this.mapCommentToDto(comment));
    }
    async getCommentsByAuthorId(authorId) {
        const userId = new User_1.UserId(authorId);
        const comments = await this.commentRepository.findByAuthorId(userId);
        return comments.map(comment => this.mapCommentToDto(comment));
    }
    async getAllComments() {
        const comments = await this.commentRepository.findAll();
        return comments.map(comment => this.mapCommentToDto(comment));
    }
    async updateComment(id, updateCommentDto) {
        const commentId = new Comment_1.CommentId(id);
        const comment = await this.commentRepository.findById(commentId);
        if (!comment) {
            throw new Error("Comment not found");
        }
        comment.updateContent(updateCommentDto.content);
        await this.commentRepository.save(comment);
        return this.mapCommentToDto(comment);
    }
    async deleteComment(id) {
        const commentId = new Comment_1.CommentId(id);
        await this.commentRepository.delete(commentId);
    }
    mapCommentToDto(comment) {
        return {
            id: comment.getId().toString(),
            content: comment.getContent(),
            authorId: comment.getAuthorId().toString(),
            blogId: comment.getBlogId().toString(),
            createdAt: comment.getCreatedAt().toISOString(),
            updatedAt: comment.getUpdatedAt().toISOString()
        };
    }
};
exports.CommentServiceImpl = CommentServiceImpl;
exports.CommentServiceImpl = CommentServiceImpl = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("CommentRepository")),
    __metadata("design:paramtypes", [Object])
], CommentServiceImpl);
//# sourceMappingURL=CommentServiceImpl.js.map