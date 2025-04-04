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
exports.SequelizeLikeRepository = void 0;
const inversify_1 = require("inversify");
const Blog_1 = require("../../domain/entities/Blog");
const Like_1 = require("../../domain/entities/Like");
const User_1 = require("../../domain/entities/User");
const LikeModel_1 = __importDefault(require("../models/LikeModel"));
require("reflect-metadata");
let SequelizeLikeRepository = class SequelizeLikeRepository {
    async findById(id) {
        const likeModel = await LikeModel_1.default.findByPk(id.toString());
        if (!likeModel) {
            return null;
        }
        return this.mapToDomain(likeModel);
    }
    async findByBlogId(blogId) {
        const likeModels = await LikeModel_1.default.findAll({
            where: { blogId }
        });
        return likeModels.map(likeModel => this.mapToDomain(likeModel));
    }
    async findByUserId(userId) {
        const likeModels = await LikeModel_1.default.findAll({
            where: { userId }
        });
        return likeModels.map(likeModel => this.mapToDomain(likeModel));
    }
    async findByBlogAndUserId(blogId, userId) {
        const likeModel = await LikeModel_1.default.findOne({
            where: {
                blogId,
                userId
            }
        });
        if (!likeModel) {
            return null;
        }
        return this.mapToDomain(likeModel);
    }
    async findByBlogIdAndUserId(blogId, userId) {
        return this.findByBlogAndUserId(blogId, userId);
    }
    async findAll() {
        const likeModels = await LikeModel_1.default.findAll();
        return likeModels.map(likeModel => this.mapToDomain(likeModel));
    }
    async save(like) {
        await LikeModel_1.default.upsert({
            id: like.getId().toString(),
            userId: like.getUserId().toString(),
            blogId: like.getBlogId().toString()
        });
    }
    async delete(id) {
        await LikeModel_1.default.destroy({ where: { id: id.toString() } });
    }
    mapToDomain(likeModel) {
        return new Like_1.Like(new Like_1.LikeId(likeModel.id), new User_1.UserId(likeModel.userId), new Blog_1.BlogId(likeModel.blogId), new Date(likeModel.createdAt));
    }
};
exports.SequelizeLikeRepository = SequelizeLikeRepository;
exports.SequelizeLikeRepository = SequelizeLikeRepository = __decorate([
    (0, inversify_1.injectable)()
], SequelizeLikeRepository);
//# sourceMappingURL=SequelizeLikeRepository.js.map