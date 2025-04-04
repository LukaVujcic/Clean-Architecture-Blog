import { Model } from 'sequelize';
declare class LikeModel extends Model {
    id: string;
    userId: string;
    blogId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default LikeModel;
