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
exports.CreateBlogUseCase = void 0;
const inversify_1 = require("inversify");
const Blog_1 = require("../../../domain/entities/Blog");
const User_1 = require("../../../domain/entities/User");
const BlogMapper_1 = require("../../mappers/BlogMapper");
const crypto_1 = require("crypto");
require("reflect-metadata");
let CreateBlogUseCase = class CreateBlogUseCase {
    constructor(blogRepository, userRepository) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
    }
    async execute(createBlogDto) {
        const { title, content, authorId } = createBlogDto;
        // Check if user exists
        const userIdObj = new User_1.UserId(authorId);
        const user = await this.userRepository.findById(userIdObj);
        if (!user) {
            throw new Error("User not found");
        }
        // Create new blog
        const blogId = new Blog_1.BlogId((0, crypto_1.randomUUID)());
        const blog = new Blog_1.Blog(blogId, title, content, userIdObj);
        await this.blogRepository.save(blog);
        return BlogMapper_1.BlogMapper.toDto(blog);
    }
};
exports.CreateBlogUseCase = CreateBlogUseCase;
exports.CreateBlogUseCase = CreateBlogUseCase = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("BlogRepository")),
    __param(1, (0, inversify_1.inject)("UserRepository")),
    __metadata("design:paramtypes", [Object, Object])
], CreateBlogUseCase);
//# sourceMappingURL=CreateBlogUseCase.js.map