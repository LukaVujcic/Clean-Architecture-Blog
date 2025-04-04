import { Request, Response } from 'express';
import { UserService } from '../../application/interfaces/UserService';
import 'reflect-metadata';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    /**
     * @swagger
     * /api/users:
     *   post:
     *     summary: Create a new user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateUserDto'
     *     responses:
     *       201:
     *         description: The user was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/UserResponseDto'
     */
    createUser(req: Request, res: Response): Promise<void>;
    /**
     * @swagger
     * /api/users/{id}:
     *   get:
     *     summary: Get a user by ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The user ID
     *     responses:
     *       200:
     *         description: The user details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/UserResponseDto'
     *       404:
     *         description: The user was not found
     */
    getUserById(req: Request, res: Response): Promise<void>;
    /**
     * @swagger
     * /api/users:
     *   get:
     *     summary: Get all users
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: The list of users
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/UserResponseDto'
     */
    getAllUsers(req: Request, res: Response): Promise<void>;
    /**
     * @swagger
     * /api/users/{id}:
     *   put:
     *     summary: Update a user
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The user ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateUserDto'
     *     responses:
     *       200:
     *         description: The user was updated
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/UserResponseDto'
     *       404:
     *         description: The user was not found
     */
    updateUser(req: Request, res: Response): Promise<void>;
    /**
     * @swagger
     * /api/users/{id}:
     *   delete:
     *     summary: Delete a user
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The user ID
     *     responses:
     *       204:
     *         description: The user was deleted
     *       404:
     *         description: The user was not found
     */
    deleteUser(req: Request, res: Response): Promise<void>;
}
