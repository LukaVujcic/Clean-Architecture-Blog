"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inversify_config_1 = require("../config/inversify.config");
const userRouter = (0, express_1.Router)();
const userController = inversify_config_1.container.get('UserController');
userRouter.post('/', (req, res) => userController.createUser(req, res));
userRouter.get('/:id', (req, res) => userController.getUserById(req, res));
userRouter.get('/', (req, res) => userController.getAllUsers(req, res));
userRouter.put('/:id', (req, res) => userController.updateUser(req, res));
userRouter.delete('/:id', (req, res) => userController.deleteUser(req, res));
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map