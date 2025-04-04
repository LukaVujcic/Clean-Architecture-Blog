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
exports.BlogServiceImpl = void 0;
const inversify_1 = require("inversify");
const Blog_1 = require("../../domain/entities/Blog");
const User_1 = require("../../domain/entities/User");
const crypto_1 = require("crypto");
require("reflect-metadata");
let BlogServiceImpl = class BlogServiceImpl {
    constructor(blogRepository, userRepository) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
    }
    async createBlog(createBlogDto) {
        const { title, content, authorId } = createBlogDto;
        // Check if author exists
        const userId = new User_1.UserId(authorId);
        const author = await this.userRepository.findById(userId);
        if (!author) {
            throw new Error("Author not found");
        }
        const blogId = new Blog_1.BlogId((0, crypto_1.randomUUID)());
        const blog = new Blog_1.Blog(blogId, title, content, userId);
        await this.blogRepository.save(blog);
        return this.mapBlogToDto(blog);
    }
    async getBlogById(id) {
        const blogId = new Blog_1.BlogId(id);
        const blog = await this.blogRepository.findById(blogId);
        if (!blog) {
            throw new Error("Blog not found");
        }
        return this.mapBlogToDto(blog);
    }
    async getBlogsByAuthorId(authorId) {
        const blogs = await this.blogRepository.findByUserId(authorId);
        return blogs.map(blog => this.mapBlogToDto(blog));
    }
    async getAllBlogs() {
        const blogs = await this.blogRepository.findAll();
        return blogs.map(blog => this.mapBlogToDto(blog));
    }
    async updateBlog(id, updateBlogDto) {
        const blogId = new Blog_1.BlogId(id);
        const blog = await this.blogRepository.findById(blogId);
        if (!blog) {
            throw new Error("Blog not found");
        }
        // Update blog properties
        if (updateBlogDto.title) {
            blog.updateTitle(updateBlogDto.title);
        }
        if (updateBlogDto.content) {
            blog.updateContent(updateBlogDto.content);
        }
        await this.blogRepository.save(blog);
        return this.mapBlogToDto(blog);
    }
    async deleteBlog(id) {
        const blogId = new Blog_1.BlogId(id);
        const blog = await this.blogRepository.findById(blogId);
        if (!blog) {
            throw new Error("Blog not found");
        }
        await this.blogRepository.delete(blogId);
    }
    mapBlogToDto(blog) {
        return {
            id: blog.getId().toString(),
            title: blog.getTitle(),
            content: blog.getContent(),
            authorId: blog.getAuthorId().toString(),
            createdAt: blog.getCreatedAt().toISOString(),
            updatedAt: blog.getUpdatedAt().toISOString(),
            likes: blog.getLikes()
        };
    }
};
exports.BlogServiceImpl = BlogServiceImpl;
exports.BlogServiceImpl = BlogServiceImpl = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("BlogRepository")),
    __param(1, (0, inversify_1.inject)("UserRepository")),
    __metadata("design:paramtypes", [Object, Object])
], BlogServiceImpl);
//# sourceMappingURL=BlogServiceImpl.js.map