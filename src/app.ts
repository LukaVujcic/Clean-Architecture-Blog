import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import swaggerSpec from './infrastructure/config/swagger';
import { container } from './infrastructure/config/container';
import { UserController } from './infrastructure/controllers/UserController';
import { BlogController } from './infrastructure/controllers/BlogController';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Get controllers from container
const userController = container.get<UserController>(UserController);
const blogController = container.get<BlogController>(BlogController);

// Routes
const apiRouter = express.Router();

// User routes
apiRouter.post('/users', (req, res) => userController.createUser(req, res));
apiRouter.get('/users', (req, res) => userController.getAllUsers(req, res));
apiRouter.get('/users/:id', (req, res) => userController.getUserById(req, res));
apiRouter.put('/users/:id', (req, res) => userController.updateUser(req, res));
apiRouter.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

// Blog routes
apiRouter.post('/blogs', (req, res) => blogController.createBlog(req, res));
apiRouter.get('/blogs', (req, res) => blogController.getAllBlogs(req, res));
apiRouter.get('/blogs/author/:authorId', (req, res) => blogController.getBlogsByAuthor(req, res));
apiRouter.get('/blogs/:id', (req, res) => blogController.getBlogById(req, res));
apiRouter.put('/blogs/:id', (req, res) => blogController.updateBlog(req, res));
apiRouter.delete('/blogs/:id', (req, res) => blogController.deleteBlog(req, res));

// Mount API routes
app.use('/api', apiRouter);

export { app }; 