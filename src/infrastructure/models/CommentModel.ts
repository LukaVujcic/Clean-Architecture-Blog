import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import UserModel from './UserModel';
import BlogModel from './BlogModel';

class CommentModel extends Model {
  public id!: string;
  public content!: string;
  public authorId!: string;
  public blogId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CommentModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    authorId: {
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
    tableName: 'comments',
    timestamps: true
  }
);

// Define associations
CommentModel.belongsTo(UserModel, { 
  foreignKey: 'authorId', 
  as: 'author'
});

CommentModel.belongsTo(BlogModel, { 
  foreignKey: 'blogId', 
  as: 'blog'
});

export default CommentModel;