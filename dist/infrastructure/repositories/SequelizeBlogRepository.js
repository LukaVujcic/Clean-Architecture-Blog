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
exports.SequelizeBlogRepository = void 0;
const inversify_1 = require("inversify");
const Blog_1 = require("../../domain/entities/Blog");
const User_1 = require("../../domain/entities/User");
const BlogModel_1 = __importDefault(require("../models/BlogModel"));
require("reflect-metadata");
let SequelizeBlogRepository = class SequelizeBlogRepository {
    async findById(id) {
        const blogModel = await BlogModel_1.default.findByPk(id.toString());
        if (!blogModel) {
            return null;
        }
        return this.mapToDomain(blogModel);
    }
    async findByUserId(userId) {
        const blogModels = await BlogModel_1.default.findAll({
            where: { authorId: userId }
        });
        return blogModels.map(blogModel => this.mapToDomain(blogModel));
    }
    async findByAuthorId(authorId) {
        const blogModels = await BlogModel_1.default.findAll({
            where: { authorId: authorId.toString() }
        });
        return blogModels.map(blogModel => this.mapToDomain(blogModel));
    }
    async findAll() {
        const blogModels = await BlogModel_1.default.findAll();
        return blogModels.map(blogModel => this.mapToDomain(blogModel));
    }
    async save(blog) {
        await BlogModel_1.default.upsert({
            id: blog.getId().toString(),
            title: blog.getTitle(),
            content: blog.getContent(),
            authorId: blog.getAuthorId().toString(),
            likes: blog.getLikes()
        });
    }
    async delete(id) {
        await BlogModel_1.default.destroy({ where: { id: id.toString() } });
    }
    mapToDomain(blogModel) {
        return new Blog_1.Blog(new Blog_1.BlogId(blogModel.id), blogModel.title, blogModel.content, new User_1.UserId(blogModel.authorId), new Date(blogModel.createdAt), new Date(blogModel.updatedAt), blogModel.likes);
    }
};
exports.SequelizeBlogRepository = SequelizeBlogRepository;
exports.SequelizeBlogRepository = SequelizeBlogRepository = __decorate([
    (0, inversify_1.injectable)()
], SequelizeBlogRepository);
//# sourceMappingURL=SequelizeBlogRepository.js.map