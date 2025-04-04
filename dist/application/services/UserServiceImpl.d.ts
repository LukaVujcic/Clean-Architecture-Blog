import { UserRepository } from "../../domain/repositories/UserRepository";
import { CreateUserDto, UpdateUserDto, UserResponseDto } from "../dtos/UserDto";
import { UserService } from "../interfaces/UserService";
import "reflect-metadata";
export declare class UserServiceImpl implements UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    createUser(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    getUserById(id: string): Promise<UserResponseDto>;
    getUserByEmail(email: string): Promise<UserResponseDto>;
    getUserByUsername(username: string): Promise<UserResponseDto>;
    getAllUsers(): Promise<UserResponseDto[]>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    deleteUser(id: string): Promise<void>;
    private mapUserToDto;
}
