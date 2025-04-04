"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const SequelizeUserRepository_1 = require("../repositories/SequelizeUserRepository");
const UserServiceImpl_1 = require("../../application/services/UserServiceImpl");
const UserController_1 = require("../controllers/UserController");
const SequelizeBlogRepository_1 = require("../repositories/SequelizeBlogRepository");
const BlogServiceImpl_1 = require("../../application/services/BlogServiceImpl");
const SequelizeCommentRepository_1 = require("../repositories/SequelizeCommentRepository");
const CommentServiceImpl_1 = require("../../application/services/CommentServiceImpl");
const SequelizeLikeRepository_1 = require("../repositories/SequelizeLikeRepository");
const LikeServiceImpl_1 = require("../../application/services/LikeServiceImpl");
const BlogController_1 = require("../controllers/BlogController");
// Create and configure container
const container = new inversify_1.Container();
exports.container = container;
// Repositories
container.bind('UserRepository').to(SequelizeUserRepository_1.SequelizeUserRepository);
container.bind('BlogRepository').to(SequelizeBlogRepository_1.SequelizeBlogRepository);
container.bind('CommentRepository').to(SequelizeCommentRepository_1.SequelizeCommentRepository);
container.bind('LikeRepository').to(SequelizeLikeRepository_1.SequelizeLikeRepository);
// Services
container.bind('UserService').to(UserServiceImpl_1.UserServiceImpl);
container.bind('BlogService').to(BlogServiceImpl_1.BlogServiceImpl);
container.bind('CommentService').to(CommentServiceImpl_1.CommentServiceImpl);
container.bind('LikeService').to(LikeServiceImpl_1.LikeServiceImpl);
// Controllers
container.bind(UserController_1.UserController).toSelf();
container.bind(BlogController_1.BlogController).toSelf();
//# sourceMappingURL=container.js.map