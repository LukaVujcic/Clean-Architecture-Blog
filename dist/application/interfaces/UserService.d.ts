import { CreateUserDto, UpdateUserDto, UserResponseDto } from "../dtos/UserDto";
export interface UserService {
    createUser(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    getUserById(id: string): Promise<UserResponseDto>;
    getUserByEmail(email: string): Promise<UserResponseDto>;
    getUserByUsername(username: string): Promise<UserResponseDto>;
    getAllUsers(): Promise<UserResponseDto[]>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    deleteUser(id: string): Promise<void>;
}
