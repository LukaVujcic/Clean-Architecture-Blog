import { UserRepository } from "../../../domain/ports/UserRepository";
import { CreateUserDto, UserResponseDto } from "../../dtos/UserDto";
import "reflect-metadata";
export declare class CreateUserUseCase {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute(createUserDto: CreateUserDto): Promise<UserResponseDto>;
}
