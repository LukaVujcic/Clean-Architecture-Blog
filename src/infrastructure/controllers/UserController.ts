import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { UserService } from '../../application/interfaces/UserService';
import { CreateUserDto, UpdateUserDto } from '../../application/dtos/UserDto';
import 'reflect-metadata';

@injectable()
export class UserController {
  constructor(
    @inject('UserService') private userService: UserService
  ) {}

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
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const createUserDto: CreateUserDto = req.body;
      const user = await this.userService.createUser(createUserDto);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

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
  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const user = await this.userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

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
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

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
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const updateUserDto: UpdateUserDto = req.body;
      const user = await this.userService.updateUser(id, updateUserDto);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

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
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      
      // First check if the user exists
      try {
        await this.userService.getUserById(id);
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
        return;
      }
      
      await this.userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }
} 