"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_1 = __importDefault(require("./infrastructure/config/swagger"));
const container_1 = require("./infrastructure/config/container");
const UserController_1 = require("./infrastructure/controllers/UserController");
const BlogController_1 = require("./infrastructure/controllers/BlogController");
// Load environment variables
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
exports.app = app;
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Swagger API docs
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
// Get controllers from container
const userController = container_1.container.get(UserController_1.UserController);
const blogController = container_1.container.get(BlogController_1.BlogController);
// Routes
const apiRouter = express_1.default.Router();
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
//# sourceMappingURL=app.js.map