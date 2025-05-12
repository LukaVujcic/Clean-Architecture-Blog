import { UserRepository } from "../../../domain/ports/UserRepository";
import { UpdateUserDto, UserResponseDto } from "../../dtos/UserDto";
import "reflect-metadata";
export declare class UpdateUserUseCase {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
}
