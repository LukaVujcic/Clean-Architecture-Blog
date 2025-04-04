"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const UserServiceImpl_1 = require("../../application/services/UserServiceImpl");
const BlogServiceImpl_1 = require("../../application/services/BlogServiceImpl");
const CommentServiceImpl_1 = require("../../application/services/CommentServiceImpl");
const LikeServiceImpl_1 = require("../../application/services/LikeServiceImpl");
const SequelizeUserRepository_1 = require("../repositories/SequelizeUserRepository");
const SequelizeBlogRepository_1 = require("../repositories/SequelizeBlogRepository");
const SequelizeCommentRepository_1 = require("../repositories/SequelizeCommentRepository");
const SequelizeLikeRepository_1 = require("../repositories/SequelizeLikeRepository");
const container = new inversify_1.Container();
exports.container = container;
// Repositories
container.bind("UserRepository").to(SequelizeUserRepository_1.SequelizeUserRepository);
container.bind("BlogRepository").to(SequelizeBlogRepository_1.SequelizeBlogRepository);
container.bind("CommentRepository").to(SequelizeCommentRepository_1.SequelizeCommentRepository);
container.bind("LikeRepository").to(SequelizeLikeRepository_1.SequelizeLikeRepository);
// Services
container.bind("UserService").to(UserServiceImpl_1.UserServiceImpl);
container.bind("BlogService").to(BlogServiceImpl_1.BlogServiceImpl);
container.bind("CommentService").to(CommentServiceImpl_1.CommentServiceImpl);
container.bind("LikeService").to(LikeServiceImpl_1.LikeServiceImpl);
//# sourceMappingURL=inversify.config.js.map