"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeUserRepository = void 0;
const inversify_1 = require("inversify");
const User_1 = require("../../domain/entities/User");
const UserModel_1 = __importDefault(require("../models/UserModel"));
require("reflect-metadata");
let SequelizeUserRepository = class SequelizeUserRepository {
    async findById(id) {
        const userModel = await UserModel_1.default.findByPk(id.toString());
        if (!userModel) {
            return null;
        }
        return this.mapToDomain(userModel);
    }
    async findByEmail(email) {
        const userModel = await UserModel_1.default.findOne({ where: { email } });
        if (!userModel) {
            return null;
        }
        return this.mapToDomain(userModel);
    }
    async findByUsername(username) {
        const userModel = await UserModel_1.default.findOne({ where: { username } });
        if (!userModel) {
            return null;
        }
        return this.mapToDomain(userModel);
    }
    async findAll() {
        const userModels = await UserModel_1.default.findAll();
        return userModels.map(userModel => this.mapToDomain(userModel));
    }
    async save(user) {
        await UserModel_1.default.upsert({
            id: user.getId().toString(),
            username: user.getUsername(),
            email: user.getEmail(),
            password: user.getPassword()
        });
    }
    async delete(id) {
        await UserModel_1.default.destroy({ where: { id: id.toString() } });
    }
    mapToDomain(userModel) {
        return new User_1.User(new User_1.UserId(userModel.id), userModel.username, userModel.email, userModel.password);
    }
};
exports.SequelizeUserRepository = SequelizeUserRepository;
exports.SequelizeUserRepository = SequelizeUserRepository = __decorate([
    (0, inversify_1.injectable)()
], SequelizeUserRepository);
//# sourceMappingURL=SequelizeUserRepository.js.map