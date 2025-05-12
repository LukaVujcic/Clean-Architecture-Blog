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
exports.UpdateUserUseCase = void 0;
const inversify_1 = require("inversify");
const User_1 = require("../../../domain/entities/User");
const UserMapper_1 = require("../../mappers/UserMapper");
require("reflect-metadata");
let UpdateUserUseCase = class UpdateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id, updateUserDto) {
        const userId = new User_1.UserId(id);
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        // Update user properties
        if (updateUserDto.username) {
            user.updateUsername(updateUserDto.username);
        }
        if (updateUserDto.email) {
            user.updateEmail(updateUserDto.email);
        }
        if (updateUserDto.password) {
            user.updatePassword(updateUserDto.password);
        }
        await this.userRepository.save(user);
        return UserMapper_1.UserMapper.toDto(user);
    }
};
exports.UpdateUserUseCase = UpdateUserUseCase;
exports.UpdateUserUseCase = UpdateUserUseCase = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("UserRepository")),
    __metadata("design:paramtypes", [Object])
], UpdateUserUseCase);
//# sourceMappingURL=UpdateUserUseCase.js.map