"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserId = void 0;
class UserId {
    constructor(value) {
        this.value = value;
    }
    toString() {
        return this.value;
    }
    equals(id) {
        return this.value === id.value;
    }
}
exports.UserId = UserId;
class User {
    constructor(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    getId() {
        return this.id;
    }
    getUsername() {
        return this.username;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    updateUsername(username) {
        this.username = username;
    }
    updateEmail(email) {
        this.email = email;
    }
    updatePassword(password) {
        this.password = password;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map