import { inject, injectable } from "inversify";
import { UserId } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/ports/UserRepository";
import "reflect-metadata";

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  async execute(id: string): Promise<void> {
    const userId = new UserId(id);
    await this.userRepository.delete(userId);
  }
} 