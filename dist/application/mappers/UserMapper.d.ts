import { User } from "../../domain/entities/User";
import { UserResponseDto } from "../dtos/UserDto";
export declare class UserMapper {
    static toDto(user: User): UserResponseDto;
}
