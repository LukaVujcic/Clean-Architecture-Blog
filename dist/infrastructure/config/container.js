"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const SequelizeUserRepository_1 = require("../repositories/SequelizeUserRepository");
const SequelizeBlogRepository_1 = require("../repositories/SequelizeBlogRepository");
const SequelizeCommentRepository_1 = require("../repositories/SequelizeCommentRepository");
const SequelizeLikeRepository_1 = require("../repositories/SequelizeLikeRepository");
const UserController_1 = require("../controllers/UserController");
const BlogController_1 = require("../controllers/BlogController");
// User Use Cases
const CreateUserUseCase_1 = require("../../application/use-cases/user/CreateUserUseCase");
const GetUserUseCase_1 = require("../../application/use-cases/user/GetUserUseCase");
const UpdateUserUseCase_1 = require("../../application/use-cases/user/UpdateUserUseCase");
const DeleteUserUseCase_1 = require("../../application/use-cases/user/DeleteUserUseCase");
// Blog Use Cases
const CreateBlogUseCase_1 = require("../../application/use-cases/blog/CreateBlogUseCase");
const GetBlogUseCase_1 = require("../../application/use-cases/blog/GetBlogUseCase");
const UpdateBlogUseCase_1 = require("../../application/use-cases/blog/UpdateBlogUseCase");
const DeleteBlogUseCase_1 = require("../../application/use-cases/blog/DeleteBlogUseCase");
// Create and configure container
const container = new inversify_1.Container();
exports.container = container;
// Repositories
container.bind('UserRepository').to(SequelizeUserRepository_1.SequelizeUserRepository);
container.bind('BlogRepository').to(SequelizeBlogRepository_1.SequelizeBlogRepository);
container.bind('CommentRepository').to(SequelizeCommentRepository_1.SequelizeCommentRepository);
container.bind('LikeRepository').to(SequelizeLikeRepository_1.SequelizeLikeRepository);
// User Use Cases
container.bind(CreateUserUseCase_1.CreateUserUseCase).toSelf();
container.bind(GetUserUseCase_1.GetUserUseCase).toSelf();
container.bind(UpdateUserUseCase_1.UpdateUserUseCase).toSelf();
container.bind(DeleteUserUseCase_1.DeleteUserUseCase).toSelf();
// Blog Use Cases
container.bind(CreateBlogUseCase_1.CreateBlogUseCase).toSelf();
container.bind(GetBlogUseCase_1.GetBlogUseCase).toSelf();
container.bind(UpdateBlogUseCase_1.UpdateBlogUseCase).toSelf();
container.bind(DeleteBlogUseCase_1.DeleteBlogUseCase).toSelf();
// Controllers
container.bind(UserController_1.UserController).toSelf();
container.bind(BlogController_1.BlogController).toSelf();
//# sourceMappingURL=container.js.map