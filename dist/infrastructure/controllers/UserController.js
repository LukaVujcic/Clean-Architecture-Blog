"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const inversify_1 = require("inversify");
const CreateUserUseCase_1 = require("../../application/use-cases/user/CreateUserUseCase");
const GetUserUseCase_1 = require("../../application/use-cases/user/GetUserUseCase");
const UpdateUserUseCase_1 = require("../../application/use-cases/user/UpdateUserUseCase");
const DeleteUserUseCase_1 = require("../../application/use-cases/user/DeleteUserUseCase");
require("reflect-metadata");
let UserController = class UserController {
    constructor(createUserUseCase, getUserUseCase, updateUserUseCase, deleteUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.getUserUseCase = getUserUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
    }
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
    async createUser(req, res) {
        try {
            const createUserDto = req.body;
            const user = await this.createUserUseCase.execute(createUserDto);
            res.status(201).json(user);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
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
    async getUserById(req, res) {
        try {
            const id = req.params.id;
            const user = await this.getUserUseCase.getById(id);
            res.status(200).json(user);
        }
        catch (error) {
            res.status(404).json({ message: error.message });
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
    async getAllUsers(req, res) {
        try {
            const users = await this.getUserUseCase.getAll();
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
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
    async updateUser(req, res) {
        try {
            const id = req.params.id;
            const updateUserDto = req.body;
            const user = await this.updateUserUseCase.execute(id, updateUserDto);
            res.status(200).json(user);
        }
        catch (error) {
            res.status(404).json({ message: error.message });
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
    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            // First check if the user exists
            try {
                await this.getUserUseCase.getById(id);
            }
            catch (error) {
                res.status(404).json({ message: error.message });
                return;
            }
            await this.deleteUserUseCase.execute(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
};
exports.UserController = UserController;
exports.UserController = UserController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(CreateUserUseCase_1.CreateUserUseCase)),
    __param(1, (0, inversify_1.inject)(GetUserUseCase_1.GetUserUseCase)),
    __param(2, (0, inversify_1.inject)(UpdateUserUseCase_1.UpdateUserUseCase)),
    __param(3, (0, inversify_1.inject)(DeleteUserUseCase_1.DeleteUserUseCase)),
    __metadata("design:paramtypes", [CreateUserUseCase_1.CreateUserUseCase,
        GetUserUseCase_1.GetUserUseCase,
        UpdateUserUseCase_1.UpdateUserUseCase,
        DeleteUserUseCase_1.DeleteUserUseCase])
], UserController);
//# sourceMappingURL=UserController.js.map