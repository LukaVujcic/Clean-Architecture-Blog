"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
let config;
// Use SQLite for development and testing
if (!isProduction) {
    config = {
        dialect: 'sqlite',
        storage: process.env.DB_STORAGE || (isTest ? ':memory:' : './blog.sqlite'),
        logging: process.env.DB_LOGGING === 'true' ? console.log : false
    };
}
else {
    // Use PostgreSQL for production
    config = {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    };
}
// For SQLite, username and password are not used
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || 'blog', process.env.DB_USER || 'postgres', process.env.DB_PASSWORD || 'postgres', config);
exports.default = sequelize;
//# sourceMappingURL=database.js.map