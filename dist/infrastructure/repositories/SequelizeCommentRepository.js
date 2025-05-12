"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeCommentRepository = void 0;
const inversify_1 = require("inversify");
const Blog_1 = require("../../domain/entities/Blog");
const Comment_1 = require("../../domain/entities/Comment");
const User_1 = require("../../domain/entities/User");
const CommentModel_1 = __importDefault(require("../models/CommentModel"));
require("reflect-metadata");
let SequelizeCommentRepository = class SequelizeCommentRepository {
    async findById(id) {
        const commentModel = await CommentModel_1.default.findByPk(id.toString());
        if (!commentModel) {
            return null;
        }
        return this.mapToDomain(commentModel);
    }
    async findByBlogId(blogId) {
        const commentModels = await CommentModel_1.default.findAll({
            where: { blogId }
        });
        return commentModels.map(commentModel => this.mapToDomain(commentModel));
    }
    async findByUserId(userId) {
        const commentModels = await CommentModel_1.default.findAll({
            where: { authorId: userId }
        });
        return commentModels.map(commentModel => this.mapToDomain(commentModel));
    }
    async findAll() {
        const commentModels = await CommentModel_1.default.findAll();
        return commentModels.map(commentModel => this.mapToDomain(commentModel));
    }
    async save(comment) {
        await CommentModel_1.default.upsert({
            id: comment.getId().toString(),
            content: comment.getContent(),
            authorId: comment.getAuthorId().toString(),
            blogId: comment.getBlogId().toString()
        });
    }
    async delete(id) {
        await CommentModel_1.default.destroy({ where: { id: id.toString() } });
    }
    mapToDomain(commentModel) {
        return new Comment_1.Comment(new Comment_1.CommentId(commentModel.id), commentModel.content, new User_1.UserId(commentModel.authorId), new Blog_1.BlogId(commentModel.blogId), new Date(commentModel.createdAt), new Date(commentModel.updatedAt));
    }
};
exports.SequelizeCommentRepository = SequelizeCommentRepository;
exports.SequelizeCommentRepository = SequelizeCommentRepository = __decorate([
    (0, inversify_1.injectable)()
], SequelizeCommentRepository);
//# sourceMappingURL=SequelizeCommentRepository.js.map