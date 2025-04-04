import { injectable } from "inversify";
import { User, UserId } from "../../domain/entities/User";
import { UserRepository } from "../../domain/ports/UserRepository";
import UserModel from "../models/UserModel";
import "reflect-metadata";

@injectable()
export class SequelizeUserRepository implements UserRepository {
  async findById(id: UserId): Promise<User | null> {
    const userModel = await UserModel.findByPk(id.toString());
    
    if (!userModel) {
      return null;
    }
    
    return this.mapToDomain(userModel);
  }
  
  async findByEmail(email: string): Promise<User | null> {
    const userModel = await UserModel.findOne({ where: { email } });
    
    if (!userModel) {
      return null;
    }
    
    return this.mapToDomain(userModel);
  }
  
  async findByUsername(username: string): Promise<User | null> {
    const userModel = await UserModel.findOne({ where: { username } });
    
    if (!userModel) {
      return null;
    }
    
    return this.mapToDomain(userModel);
  }
  
  async findAll(): Promise<User[]> {
    const userModels = await UserModel.findAll();
    
    return userModels.map(userModel => this.mapToDomain(userModel));
  }
  
  async save(user: User): Promise<void> {
    await UserModel.upsert({
      id: user.getId().toString(),
      username: user.getUsername(),
      email: user.getEmail(),
      password: user.getPassword()
    });
  }
  
  async delete(id: UserId): Promise<void> {
    await UserModel.destroy({ where: { id: id.toString() } });
  }
  
  private mapToDomain(userModel: UserModel): User {
    return new User(
      new UserId(userModel.id),
      userModel.username,
      userModel.email,
      userModel.password
    );
  }
} 