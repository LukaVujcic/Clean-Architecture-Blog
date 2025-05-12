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
exports.GetBlogUseCase = void 0;
const inversify_1 = require("inversify");
const Blog_1 = require("../../../domain/entities/Blog");
const BlogMapper_1 = require("../../mappers/BlogMapper");
require("reflect-metadata");
let GetBlogUseCase = class GetBlogUseCase {
    constructor(blogRepository) {
        this.blogRepository = blogRepository;
    }
    async getById(id) {
        const blogId = new Blog_1.BlogId(id);
        const blog = await this.blogRepository.findById(blogId);
        if (!blog) {
            throw new Error("Blog not found");
        }
        return BlogMapper_1.BlogMapper.toDto(blog);
    }
    async getByAuthorId(authorId) {
        const blogs = await this.blogRepository.findByUserId(authorId);
        return blogs.map((blog) => BlogMapper_1.BlogMapper.toDto(blog));
    }
    async getAll() {
        const blogs = await this.blogRepository.findAll();
        return blogs.map((blog) => BlogMapper_1.BlogMapper.toDto(blog));
    }
};
exports.GetBlogUseCase = GetBlogUseCase;
exports.GetBlogUseCase = GetBlogUseCase = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("BlogRepository")),
    __metadata("design:paramtypes", [Object])
], GetBlogUseCase);
//# sourceMappingURL=GetBlogUseCase.js.map