import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import sequelize from './infrastructure/config/database';
import swaggerSpec from './infrastructure/config/swagger';
import { container } from './infrastructure/config/container';
import { UserController } from './infrastructure/controllers/UserController';
import { app } from './app';
// Uncomment when implementing blog routes
// import blogRouter from './infrastructure/routes/blogRoutes';
// import commentRouter from './infrastructure/routes/commentRoutes';
// import likeRouter from './infrastructure/routes/likeRoutes';

dotenv.config();

const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Get controllers from container
const userController = container.get<UserController>(UserController);

// Routes
const apiRouter = express.Router();

// User routes
apiRouter.post('/users', (req, res) => userController.createUser(req, res));
apiRouter.get('/users', (req, res) => userController.getAllUsers(req, res));
apiRouter.get('/users/:id', (req, res) => userController.getUserById(req, res));
apiRouter.put('/users/:id', (req, res) => userController.updateUser(req, res));
apiRouter.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

// Mount API routes
app.use('/api', apiRouter);

// Uncomment when implementing blog routes
// app.use('/api/blogs', blogRouter);
// app.use('/api/comments', commentRouter);
// app.use('/api/likes', likeRouter);

// Database connection and server startup
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync database models with database (for development)
    // In production, use migrations instead
    await sequelize.sync({ force: process.env.NODE_ENV === 'development' });
    console.log('Database synchronized');
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
};

startServer(); 