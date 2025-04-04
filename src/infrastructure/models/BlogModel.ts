import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import UserModel from './UserModel';

class BlogModel extends Model {
  public id!: string;
  public title!: string;
  public content!: string;
  public authorId!: string;
  public likes!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BlogModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
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
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    tableName: 'blogs',
    timestamps: true
  }
);

// Define associations
BlogModel.belongsTo(UserModel, { 
  foreignKey: 'authorId', 
  as: 'author'
});

export default BlogModel;
