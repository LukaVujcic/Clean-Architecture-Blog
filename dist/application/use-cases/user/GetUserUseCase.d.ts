import { UserRepository } from "../../../domain/ports/UserRepository";
import { UserResponseDto } from "../../dtos/UserDto";
import "reflect-metadata";
export declare class GetUserUseCase {
    private userRepository;
    constructor(userRepository: UserRepository);
    getById(id: string): Promise<UserResponseDto>;
    getByEmail(email: string): Promise<UserResponseDto>;
    getByUsername(username: string): Promise<UserResponseDto>;
    getAll(): Promise<UserResponseDto[]>;
}
