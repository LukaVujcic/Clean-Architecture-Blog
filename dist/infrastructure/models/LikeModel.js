"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const UserModel_1 = __importDefault(require("./UserModel"));
const BlogModel_1 = __importDefault(require("./BlogModel"));
class LikeModel extends sequelize_1.Model {
}
LikeModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    userId: {
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
    tableName: 'likes',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['userId', 'blogId']
        }
    ]
});
// Define associations
LikeModel.belongsTo(UserModel_1.default, {
    foreignKey: 'userId',
    as: 'user'
});
LikeModel.belongsTo(BlogModel_1.default, {
    foreignKey: 'blogId',
    as: 'blog'
});
exports.default = LikeModel;
//# sourceMappingURL=LikeModel.js.map