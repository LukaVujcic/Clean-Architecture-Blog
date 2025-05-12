import { UserRepository } from "../../../domain/ports/UserRepository";
import "reflect-metadata";
export declare class DeleteUserUseCase {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute(id: string): Promise<void>;
}
