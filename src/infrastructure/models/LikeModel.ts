import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import UserModel from './UserModel';
import BlogModel from './BlogModel';

class LikeModel extends Model {
  public id!: string;
  public userId!: string;
  public blogId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

LikeModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: UserModel,
        key: 'id'
      }
    },
    blogId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: BlogModel,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    tableName: 'likes',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'blogId']
      }
    ]
  }
);

// Define associations
LikeModel.belongsTo(UserModel, { 
  foreignKey: 'userId', 
  as: 'user'
});

LikeModel.belongsTo(BlogModel, { 
  foreignKey: 'blogId', 
  as: 'blog'
});

export default LikeModel; 