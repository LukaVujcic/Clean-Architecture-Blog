import { Router } from 'express';
import { container } from '../config/inversify.config';
import { UserController } from '../controllers/UserController';

const userRouter = Router();
const userController = container.get<UserController>('UserController');

userRouter.post('/', (req, res) => userController.createUser(req, res));
userRouter.get('/:id', (req, res) => userController.getUserById(req, res));
userRouter.get('/', (req, res) => userController.getAllUsers(req, res));
userRouter.put('/:id', (req, res) => userController.updateUser(req, res));
userRouter.delete('/:id', (req, res) => userController.deleteUser(req, res));

export default userRouter; 