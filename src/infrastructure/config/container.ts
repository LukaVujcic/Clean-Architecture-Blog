import { Container } from 'inversify';
import { UserRepository } from '../../domain/ports/UserRepository';
import { SequelizeUserRepository } from '../repositories/SequelizeUserRepository';
import { UserService } from '../../application/interfaces/UserService';
import { UserServiceImpl } from '../../application/services/UserServiceImpl';
import { UserController } from '../controllers/UserController';
import { BlogRepository } from '../../domain/ports/BlogRepository';
import { SequelizeBlogRepository } from '../repositories/SequelizeBlogRepository';
import { BlogService } from '../../application/interfaces/BlogService';
import { BlogServiceImpl } from '../../application/services/BlogServiceImpl';
import { CommentRepository } from '../../domain/ports/CommentRepository';
import { SequelizeCommentRepository } from '../repositories/SequelizeCommentRepository';
import { CommentService } from '../../application/interfaces/CommentService';
import { CommentServiceImpl } from '../../application/services/CommentServiceImpl';
import { LikeRepository } from '../../domain/ports/LikeRepository';
import { SequelizeLikeRepository } from '../repositories/SequelizeLikeRepository';
import { LikeService } from '../../application/interfaces/LikeService';
import { LikeServiceImpl } from '../../application/services/LikeServiceImpl';
import { BlogController } from '../controllers/BlogController';

// Create and configure container
const container = new Container();

// Repositories
container.bind<UserRepository>('UserRepository').to(SequelizeUserRepository);
container.bind<BlogRepository>('BlogRepository').to(SequelizeBlogRepository);
container.bind<CommentRepository>('CommentRepository').to(SequelizeCommentRepository);
container.bind<LikeRepository>('LikeRepository').to(SequelizeLikeRepository);

// Services
container.bind<UserService>('UserService').to(UserServiceImpl);
container.bind<BlogService>('BlogService').to(BlogServiceImpl);
container.bind<CommentService>('CommentService').to(CommentServiceImpl);
container.bind<LikeService>('LikeService').to(LikeServiceImpl);

// Controllers
container.bind<UserController>(UserController).toSelf();
container.bind<BlogController>(BlogController).toSelf();

export { container }; 