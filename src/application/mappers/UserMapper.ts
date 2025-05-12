import { User } from "../../domain/entities/User";
import { UserResponseDto } from "../dtos/UserDto";

export class UserMapper {
  static toDto(user: User): UserResponseDto {
    return {
      id: user.getId().toString(),
      username: user.getUsername(),
      email: user.getEmail()
    };
  }
} 