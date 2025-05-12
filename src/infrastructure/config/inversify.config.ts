import { Container } from "inversify";
import { UserRepository } from "../../domain/ports/UserRepository";
import { BlogRepository } from "../../domain/ports/BlogRepository";
import { CommentRepository } from "../../domain/ports/CommentRepository";
import { LikeRepository } from "../../domain/ports/LikeRepository";
import { SequelizeUserRepository } from "../repositories/SequelizeUserRepository";
import { SequelizeBlogRepository } from "../repositories/SequelizeBlogRepository";
import { SequelizeCommentRepository } from "../repositories/SequelizeCommentRepository";
import { SequelizeLikeRepository } from "../repositories/SequelizeLikeRepository";
import { UserController } from "../controllers/UserController";
import { BlogController } from "../controllers/BlogController";

// User Use Cases
import { CreateUserUseCase } from "../../application/use-cases/user/CreateUserUseCase";
import { GetUserUseCase } from "../../application/use-cases/user/GetUserUseCase";
import { UpdateUserUseCase } from "../../application/use-cases/user/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../application/use-cases/user/DeleteUserUseCase";

// Blog Use Cases
import { CreateBlogUseCase } from "../../application/use-cases/blog/CreateBlogUseCase";
import { GetBlogUseCase } from "../../application/use-cases/blog/GetBlogUseCase";
import { UpdateBlogUseCase } from "../../application/use-cases/blog/UpdateBlogUseCase";
import { DeleteBlogUseCase } from "../../application/use-cases/blog/DeleteBlogUseCase";

const container = new Container();

// Repositories
container.bind<UserRepository>("UserRepository").to(SequelizeUserRepository);
container.bind<BlogRepository>("BlogRepository").to(SequelizeBlogRepository);
container.bind<CommentRepository>("CommentRepository").to(SequelizeCommentRepository);
container.bind<LikeRepository>("LikeRepository").to(SequelizeLikeRepository);

// User Use Cases
container.bind<CreateUserUseCase>(CreateUserUseCase).toSelf();
container.bind<GetUserUseCase>(GetUserUseCase).toSelf();
container.bind<UpdateUserUseCase>(UpdateUserUseCase).toSelf();
container.bind<DeleteUserUseCase>(DeleteUserUseCase).toSelf();

// Blog Use Cases
container.bind<CreateBlogUseCase>(CreateBlogUseCase).toSelf();
container.bind<GetBlogUseCase>(GetBlogUseCase).toSelf();
container.bind<UpdateBlogUseCase>(UpdateBlogUseCase).toSelf();
container.bind<DeleteBlogUseCase>(DeleteBlogUseCase).toSelf();

// Controllers
container.bind<UserController>(UserController).toSelf();
container.bind<BlogController>(BlogController).toSelf();

export { container }; 