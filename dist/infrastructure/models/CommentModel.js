"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const UserModel_1 = __importDefault(require("./UserModel"));
const BlogModel_1 = __importDefault(require("./BlogModel"));
class CommentModel extends sequelize_1.Model {
}
CommentModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
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
    blogId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: BlogModel_1.default,
            key: 'id'
        }
    }
}, {
    sequelize: database_1.default,
    tableName: 'comments',
    timestamps: true
});
// Define associations
CommentModel.belongsTo(UserModel_1.default, {
    foreignKey: 'authorId',
    as: 'author'
});
CommentModel.belongsTo(BlogModel_1.default, {
    foreignKey: 'blogId',
    as: 'blog'
});
exports.default = CommentModel;
//# sourceMappingURL=CommentModel.js.map