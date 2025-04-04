export declare class UserId {
    private value;
    constructor(value: string);
    toString(): string;
    equals(id: UserId): boolean;
}
export declare class User {
    private id;
    private username;
    private email;
    private password;
    constructor(id: UserId, username: string, email: string, password: string);
    getId(): UserId;
    getUsername(): string;
    getEmail(): string;
    getPassword(): string;
    updateUsername(username: string): void;
    updateEmail(email: string): void;
    updatePassword(password: string): void;
}
