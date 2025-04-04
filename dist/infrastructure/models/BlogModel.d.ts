import { Model } from 'sequelize';
declare class BlogModel extends Model {
    id: string;
    title: string;
    content: string;
    authorId: string;
    likes: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default BlogModel;
