"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./infrastructure/config/database"));
const swagger_1 = __importDefault(require("./infrastructure/config/swagger"));
const container_1 = require("./infrastructure/config/container");
const UserController_1 = require("./infrastructure/controllers/UserController");
const app_1 = require("./app");
// Uncomment when implementing blog routes
// import blogRouter from './infrastructure/routes/blogRoutes';
// import commentRouter from './infrastructure/routes/commentRoutes';
// import likeRouter from './infrastructure/routes/likeRoutes';
dotenv_1.default.config();
const port = process.env.PORT || 3000;
// Middleware
app_1.app.use((0, cors_1.default)());
app_1.app.use((0, helmet_1.default)());
app_1.app.use(express_1.default.json());
app_1.app.use(express_1.default.urlencoded({ extended: false }));
// Swagger API docs
app_1.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
// Get controllers from container
const userController = container_1.container.get(UserController_1.UserController);
// Routes
const apiRouter = express_1.default.Router();
// User routes
apiRouter.post('/users', (req, res) => userController.createUser(req, res));
apiRouter.get('/users', (req, res) => userController.getAllUsers(req, res));
apiRouter.get('/users/:id', (req, res) => userController.getUserById(req, res));
apiRouter.put('/users/:id', (req, res) => userController.updateUser(req, res));
apiRouter.delete('/users/:id', (req, res) => userController.deleteUser(req, res));
// Mount API routes
app_1.app.use('/api', apiRouter);
// Uncomment when implementing blog routes
// app.use('/api/blogs', blogRouter);
// app.use('/api/comments', commentRouter);
// app.use('/api/likes', likeRouter);
// Database connection and server startup
const startServer = async () => {
    try {
        await database_1.default.authenticate();
        console.log('Database connection has been established successfully.');
        // Sync database models with database (for development)
        // In production, use migrations instead
        await database_1.default.sync({ force: process.env.NODE_ENV === 'development' });
        console.log('Database synchronized');
        app_1.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
    catch (error) {
        console.error('Unable to start server:', error);
    }
};
startServer();
//# sourceMappingURL=index.js.map