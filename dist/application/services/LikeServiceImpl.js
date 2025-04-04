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
exports.LikeServiceImpl = void 0;
const inversify_1 = require("inversify");
const Blog_1 = require("../../domain/entities/Blog");
const Like_1 = require("../../domain/entities/Like");
const User_1 = require("../../domain/entities/User");
const crypto_1 = require("crypto");
require("reflect-metadata");
let LikeServiceImpl = class LikeServiceImpl {
    constructor(likeRepository, blogRepository) {
        this.likeRepository = likeRepository;
        this.blogRepository = blogRepository;
    }
    async createLike(createLikeDto) {
        const { userId, blogId } = createLikeDto;
        // Check if like already exists
        const blogIdObj = new Blog_1.BlogId(blogId);
        const userIdObj = new User_1.UserId(userId);
        const existingLike = await this.likeRepository.findByBlogIdAndUserId(blogIdObj, userIdObj);
        if (existingLike) {
            throw new Error("User has already liked this blog");
        }
        // Create new like
        const likeId = new Like_1.LikeId((0, crypto_1.randomUUID)());
        const like = new Like_1.Like(likeId, userIdObj, blogIdObj);
        await this.likeRepository.save(like);
        // Update blog likes count
        const blog = await this.blogRepository.findById(blogIdObj);
        if (blog) {
            blog.incrementLikes();
            await this.blogRepository.save(blog);
        }
        return this.mapLikeToDto(like);
    }
    async getLikeById(id) {
        const likeId = new Like_1.LikeId(id);
        const like = await this.likeRepository.findById(likeId);
        if (!like) {
            throw new Error("Like not found");
        }
        return this.mapLikeToDto(like);
    }
    async getLikesByBlogId(blogId) {
        const blogIdObj = new Blog_1.BlogId(blogId);
        const likes = await this.likeRepository.findByBlogId(blogIdObj);
        return likes.map(like => this.mapLikeToDto(like));
    }
    async getLikesByUserId(userId) {
        const userIdObj = new User_1.UserId(userId);
        const likes = await this.likeRepository.findByUserId(userIdObj);
        return likes.map(like => this.mapLikeToDto(like));
    }
    async getLikeByBlogIdAndUserId(blogId, userId) {
        const blogIdObj = new Blog_1.BlogId(blogId);
        const userIdObj = new User_1.UserId(userId);
        const like = await this.likeRepository.findByBlogIdAndUserId(blogIdObj, userIdObj);
        if (!like) {
            return null;
        }
        return this.mapLikeToDto(like);
    }
    async getAllLikes() {
        const likes = await this.likeRepository.findAll();
        return likes.map(like => this.mapLikeToDto(like));
    }
    async deleteLike(id) {
        const likeId = new Like_1.LikeId(id);
        const like = await this.likeRepository.findById(likeId);
        if (like) {
            // Update blog likes count
            const blog = await this.blogRepository.findById(like.getBlogId());
            if (blog) {
                blog.decrementLikes();
                await this.blogRepository.save(blog);
            }
        }
        await this.likeRepository.delete(likeId);
    }
    async toggleLike(blogId, userId) {
        const blogIdObj = new Blog_1.BlogId(blogId);
        const userIdObj = new User_1.UserId(userId);
        const existingLike = await this.likeRepository.findByBlogIdAndUserId(blogIdObj, userIdObj);
        if (existingLike) {
            // Unlike the blog
            await this.deleteLike(existingLike.getId().toString());
            return false;
        }
        else {
            // Like the blog
            await this.createLike({ userId, blogId });
            return true;
        }
    }
    mapLikeToDto(like) {
        return {
            id: like.getId().toString(),
            userId: like.getUserId().toString(),
            blogId: like.getBlogId().toString(),
            createdAt: like.getCreatedAt().toISOString()
        };
    }
};
exports.LikeServiceImpl = LikeServiceImpl;
exports.LikeServiceImpl = LikeServiceImpl = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("LikeRepository")),
    __param(1, (0, inversify_1.inject)("BlogRepository")),
    __metadata("design:paramtypes", [Object, Object])
], LikeServiceImpl);
//# sourceMappingURL=LikeServiceImpl.js.map