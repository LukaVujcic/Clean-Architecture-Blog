import { Model } from 'sequelize';
declare class UserModel extends Model {
    id: string;
    username: string;
    email: string;
    password: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default UserModel;
