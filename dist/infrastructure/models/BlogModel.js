"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const UserModel_1 = __importDefault(require("./UserModel"));
class BlogModel extends sequelize_1.Model {
}
BlogModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    authorId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: UserModel_1.default,
            key: 'id'
        }
    },
    likes: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: database_1.default,
    tableName: 'blogs',
    timestamps: true
});
// Define associations
BlogModel.belongsTo(UserModel_1.default, {
    foreignKey: 'authorId',
    as: 'author'
});
exports.default = BlogModel;
//# sourceMappingURL=BlogModel.js.map