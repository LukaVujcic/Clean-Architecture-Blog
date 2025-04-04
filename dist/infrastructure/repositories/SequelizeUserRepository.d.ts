import { User, UserId } from "../../domain/entities/User";
import { UserRepository } from "../../domain/ports/UserRepository";
import "reflect-metadata";
export declare class SequelizeUserRepository implements UserRepository {
    findById(id: UserId): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    save(user: User): Promise<void>;
    delete(id: UserId): Promise<void>;
    private mapToDomain;
}
