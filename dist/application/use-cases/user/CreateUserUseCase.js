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
exports.CreateUserUseCase = void 0;
const inversify_1 = require("inversify");
const User_1 = require("../../../domain/entities/User");
const UserMapper_1 = require("../../mappers/UserMapper");
const crypto_1 = require("crypto");
require("reflect-metadata");
let CreateUserUseCase = class CreateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(createUserDto) {
        const { username, email, password } = createUserDto;
        // Check if user with the same email or username already exists
        const existingUserByEmail = await this.userRepository.findByEmail(email);
        if (existingUserByEmail) {
            throw new Error("User with this email already exists");
        }
        const existingUserByUsername = await this.userRepository.findByUsername(username);
        if (existingUserByUsername) {
            throw new Error("User with this username already exists");
        }
        // Create new user
        const userId = new User_1.UserId((0, crypto_1.randomUUID)());
        const user = new User_1.User(userId, username, email, password);
        await this.userRepository.save(user);
        return UserMapper_1.UserMapper.toDto(user);
    }
};
exports.CreateUserUseCase = CreateUserUseCase;
exports.CreateUserUseCase = CreateUserUseCase = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("UserRepository")),
    __metadata("design:paramtypes", [Object])
], CreateUserUseCase);
//# sourceMappingURL=CreateUserUseCase.js.map