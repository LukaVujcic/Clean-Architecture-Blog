import { Model } from 'sequelize';
declare class CommentModel extends Model {
    id: string;
    content: string;
    authorId: string;
    blogId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default CommentModel;
