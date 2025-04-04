import { Container } from "inversify";
import { UserService } from "../../application/interfaces/UserService";
import { BlogService } from "../../application/interfaces/BlogService";
import { CommentService } from "../../application/interfaces/CommentService";
import { LikeService } from "../../application/interfaces/LikeService";
import { UserServiceImpl } from "../../application/services/UserServiceImpl";
import { BlogServiceImpl } from "../../application/services/BlogServiceImpl";
import { CommentServiceImpl } from "../../application/services/CommentServiceImpl";
import { LikeServiceImpl } from "../../application/services/LikeServiceImpl";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { BlogRepository } from "../../domain/repositories/BlogRepository";
import { CommentRepository } from "../../domain/repositories/CommentRepository";
import { LikeRepository } from "../../domain/repositories/LikeRepository";
import { SequelizeUserRepository } from "../repositories/SequelizeUserRepository";
import { SequelizeBlogRepository } from "../repositories/SequelizeBlogRepository";
import { SequelizeCommentRepository } from "../repositories/SequelizeCommentRepository";
import { SequelizeLikeRepository } from "../repositories/SequelizeLikeRepository";

const container = new Container();

// Repositories
container.bind<UserRepository>("UserRepository").to(SequelizeUserRepository);
container.bind<BlogRepository>("BlogRepository").to(SequelizeBlogRepository);
container.bind<CommentRepository>("CommentRepository").to(SequelizeCommentRepository);
container.bind<LikeRepository>("LikeRepository").to(SequelizeLikeRepository);

// Services
container.bind<UserService>("UserService").to(UserServiceImpl);
container.bind<BlogService>("BlogService").to(BlogServiceImpl);
container.bind<CommentService>("CommentService").to(CommentServiceImpl);
container.bind<LikeService>("LikeService").to(LikeServiceImpl);

export { container }; 